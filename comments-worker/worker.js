// Comments backend for chaithanyak42.com
// Runs as a Cloudflare Worker at https://comments.chaithanyak42.com
//   GET  /api/comments?page=/list-100/   -> approved comments for a page
//   POST /api/comments                   -> post a comment (goes live immediately, emails the owner)
//   GET  /admin                          -> hide / unhide / delete comments (behind Cloudflare Access)
//   POST /admin/action
// Bindings: DB (D1), TURNSTILE_SECRET, ACCESS_AUD, ACCESS_TEAM, EMAIL (send_email), RATE_LIMIT (optional)
// Stored per comment: page, name, comment text, timestamp, visible flag. No email, no IP.

import { EmailMessage } from "cloudflare:email";

const ALLOWED_ORIGINS = ["https://chaithanyak42.com", "https://www.chaithanyak42.com", "http://localhost:4000", "http://127.0.0.1:4000"];
const MAX_NAME = 60;
const MAX_BODY = 2000;

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const cors = corsHeaders(request);
    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: cors });
    try {
      if (url.pathname === "/api/comments") {
        if (request.method === "GET") return listComments(url, env, cors);
        if (request.method === "POST") return createComment(request, env, cors);
        return json({ error: "method not allowed" }, 405, cors);
      }
      if (url.pathname === "/admin" || url.pathname.startsWith("/admin/")) return admin(request, url, env);
      if (url.pathname === "/") return new Response("comments service for chaithanyak42.com", { headers: { "content-type": "text/plain" } });
      return json({ error: "not found" }, 404, cors);
    } catch (err) {
      return json({ error: "server error" }, 500, cors);
    }
  }
};

function corsHeaders(request) {
  const origin = request.headers.get("Origin") || "";
  const h = { "Vary": "Origin", "Access-Control-Allow-Methods": "GET, POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type", "Access-Control-Max-Age": "86400" };
  if (ALLOWED_ORIGINS.includes(origin)) h["Access-Control-Allow-Origin"] = origin;
  return h;
}

function json(data, status, extra) {
  return new Response(JSON.stringify(data), { status: status || 200, headers: Object.assign({ "content-type": "application/json; charset=utf-8", "cache-control": "no-store" }, extra || {}) });
}

function normalizePage(p) {
  if (typeof p !== "string" || p.length > 200) return null;
  if (!/^\/[A-Za-z0-9\-_\/.]*$/.test(p)) return null;
  if (!p.endsWith("/")) p += "/";
  return p;
}

async function listComments(url, env, cors) {
  const page = normalizePage(url.searchParams.get("page"));
  if (!page) return json({ error: "bad page" }, 400, cors);
  const { results } = await env.DB.prepare("SELECT id, name, body, created_at FROM comments WHERE page = ?1 AND approved = 1 ORDER BY created_at ASC, id ASC LIMIT 500").bind(page).all();
  return json({ comments: results }, 200, cors); // json() sets cache-control: no-store, so moderation changes show immediately
}

async function createComment(request, env, cors) {
  if (!cors["Access-Control-Allow-Origin"]) return json({ error: "forbidden" }, 403, cors);
  let data;
  try { data = await request.json(); } catch (e) { return json({ error: "invalid json" }, 400, cors); }
  const page = normalizePage(data.page);
  const name = clean(data.name, MAX_NAME);
  const body = clean(data.body, MAX_BODY);
  if (!page || !name || !body) return json({ error: "name and comment are required" }, 400, cors);
  if (data.website) return json({ status: "posted" }, 201, cors); // honeypot field: bots fill it, humans never see it
  if (env.RATE_LIMIT) {
    const ip = request.headers.get("CF-Connecting-IP") || "unknown";
    const { success } = await env.RATE_LIMIT.limit({ key: ip });
    if (!success) return json({ error: "too many comments, try again in a minute" }, 429, cors);
  }
  const ok = await verifyTurnstile(data.token, request.headers.get("CF-Connecting-IP"), env);
  if (!ok) return json({ error: "human check failed, please retry" }, 400, cors);
  const ins = await env.DB.prepare("INSERT INTO comments (page, name, body, approved) VALUES (?1, ?2, ?3, 1) RETURNING id, name, body, created_at").bind(page, name, body).first();
  await notifyOwner(env, page, ins);
  return json({ status: "posted", comment: ins }, 201, cors);
}

// Strip control characters (keep tab and newline), trim, cap length.
function clean(v, max) {
  if (typeof v !== "string") return "";
  let out = "";
  for (const ch of v) {
    const c = ch.codePointAt(0);
    if (c >= 32 || c === 9 || c === 10) out += ch;
  }
  out = out.trim();
  if (out.length > max) out = out.slice(0, max);
  return out;
}

// Email the owner about a new comment. Failures here must never block the comment itself.
async function notifyOwner(env, page, c) {
  if (!env.EMAIL || !env.OWNER_EMAIL) return;
  try {
    const from = "comments@chaithanyak42.com";
    const subject = "New comment on chaithanyak42.com" + page + " from " + c.name.replace(/[^\x20-\x7e]/g, "?");
    const text = c.name + " wrote on https://chaithanyak42.com" + page + "#comments\r\n\r\n" + c.body + "\r\n\r\n--\r\nHide or delete: https://comments.chaithanyak42.com/admin\r\n";
    const raw = [
      "From: Site comments <" + from + ">",
      "To: " + env.OWNER_EMAIL,
      "Subject: " + subject,
      "Date: " + new Date().toUTCString(),
      "Message-ID: <comment-" + c.id + "-" + Date.now() + "@chaithanyak42.com>",
      "MIME-Version: 1.0",
      "Content-Type: text/plain; charset=utf-8",
      "Content-Transfer-Encoding: 8bit",
      "",
      text
    ].join("\r\n");
    await env.EMAIL.send(new EmailMessage(from, env.OWNER_EMAIL, raw));
  } catch (e) {
    // swallow: notification is best-effort
  }
}

async function verifyTurnstile(token, ip, env) {
  if (!token || typeof token !== "string") return false;
  const form = new FormData();
  form.append("secret", env.TURNSTILE_SECRET);
  form.append("response", token);
  if (ip) form.append("remoteip", ip);
  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", { method: "POST", body: form });
  const data = await res.json();
  return data.success === true;
}

// ---- admin (behind Cloudflare Access) ----
async function admin(request, url, env) {
  const identity = await verifyAccessJwt(request, env);
  if (!identity) return new Response("Unauthorized", { status: 401 });
  if (request.method === "POST" && url.pathname === "/admin/action") {
    const sfs = request.headers.get("Sec-Fetch-Site");
    if (sfs && sfs !== "same-origin") return new Response("Forbidden", { status: 403 });
    const form = await request.formData();
    const id = Number(form.get("id"));
    const action = form.get("action");
    if (Number.isInteger(id) && id > 0) {
      if (action === "show") await env.DB.prepare("UPDATE comments SET approved = 1 WHERE id = ?1").bind(id).run();
      else if (action === "hide") await env.DB.prepare("UPDATE comments SET approved = 0 WHERE id = ?1").bind(id).run();
      else if (action === "delete") await env.DB.prepare("DELETE FROM comments WHERE id = ?1").bind(id).run();
    }
    return Response.redirect(url.origin + "/admin", 303);
  }
  if (request.method !== "GET") return new Response("Method not allowed", { status: 405 });
  const { results } = await env.DB.prepare("SELECT id, page, name, body, created_at, approved FROM comments ORDER BY approved ASC, created_at DESC LIMIT 300").all();
  return new Response(renderAdmin(results, identity), { headers: { "content-type": "text/html; charset=utf-8", "cache-control": "no-store", "x-frame-options": "DENY", "referrer-policy": "no-referrer" } });
}

function esc(s) { return String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])); }

function renderAdmin(rows, identity) {
  const hidden = rows.filter(r => !r.approved);
  const visible = rows.filter(r => r.approved);
  const row = r => '<article class="c' + (r.approved ? ' ok' : ' pending') + '"><header><strong>' + esc(r.name) + '</strong> on <a href="https://chaithanyak42.com' + esc(r.page) + '">' + esc(r.page) + '</a> <time>' + esc(r.created_at) + '</time></header><p>' + esc(r.body) + '</p><form method="post" action="/admin/action"><input type="hidden" name="id" value="' + r.id + '">' + (r.approved ? '<button name="action" value="hide">Hide</button>' : '<button name="action" value="show" class="primary">Show again</button>') + '<button name="action" value="delete" class="danger" onclick="return confirm(\'Delete this comment?\')">Delete</button></form></article>';
  return '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Comments admin</title><style>body{font:16px/1.5 -apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif;max-width:760px;margin:2rem auto;padding:0 1rem;color:#111;background:#fdfdfd}h1{font-size:1.5rem}h2{font-size:1.1rem;margin-top:2rem;color:#555}.c{border:1px solid #ddd;border-radius:8px;padding:1rem;margin:1rem 0;background:#fff}.c.pending{border-color:#e9b949;background:#fffaf0}header{font-size:.9rem;color:#555}header strong{color:#111}time{margin-left:.5rem}p{white-space:pre-wrap;margin:.5rem 0}form{display:flex;gap:.5rem}button{padding:.4rem .9rem;border:1px solid #bbb;border-radius:6px;background:#fff;cursor:pointer}button.primary{background:#2a7ae2;border-color:#2a7ae2;color:#fff}button.danger{color:#b00020}.empty{color:#777}.me{font-size:.85rem;color:#777}</style></head><body><h1>Comments admin</h1><p class="me">Signed in as ' + esc(identity) + '. ' + visible.length + ' live, ' + hidden.length + ' hidden (latest 300 shown).</p><h2>Live</h2>' + (visible.length ? visible.map(row).join('') : '<p class="empty">No comments yet.</p>') + '<h2>Hidden</h2>' + (hidden.length ? hidden.map(row).join('') : '<p class="empty">Nothing hidden.</p>') + '</body></html>';
}

// Verify the Cloudflare Access JWT ourselves, so /admin stays locked even if the Access policy were ever removed.
let jwksCache = { keys: null, fetched: 0 };
async function verifyAccessJwt(request, env) {
  const token = request.headers.get("Cf-Access-Jwt-Assertion") || cookie(request, "CF_Authorization");
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  let header, payload;
  try { header = JSON.parse(b64(parts[0])); payload = JSON.parse(b64(parts[1])); } catch (e) { return null; }
  const issuer = "https://" + env.ACCESS_TEAM + ".cloudflareaccess.com";
  const now = Math.floor(Date.now() / 1000);
  const aud = Array.isArray(payload.aud) ? payload.aud : [payload.aud];
  if (payload.iss !== issuer || !aud.includes(env.ACCESS_AUD) || !(payload.exp > now) || !payload.email) return null;
  if (Date.now() - jwksCache.fetched > 3600000 || !jwksCache.keys) {
    const res = await fetch(issuer + "/cdn-cgi/access/certs");
    const data = await res.json();
    jwksCache = { keys: data.keys || [], fetched: Date.now() };
  }
  const jwk = jwksCache.keys.find(k => k.kid === header.kid);
  if (!jwk) return null;
  const key = await crypto.subtle.importKey("jwk", jwk, { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" }, false, ["verify"]);
  const sig = b64bytes(parts[2]);
  const data = new TextEncoder().encode(parts[0] + "." + parts[1]);
  const valid = await crypto.subtle.verify("RSASSA-PKCS1-v1_5", key, sig, data);
  return valid ? payload.email : null;
}

function cookie(request, name) {
  const c = request.headers.get("Cookie") || "";
  const m = c.match(new RegExp("(?:^|;\\s*)" + name + "=([^;]+)"));
  return m ? m[1] : null;
}
function b64(s) { return new TextDecoder().decode(b64bytes(s)); }
function b64bytes(s) {
  s = s.replace(/-/g, "+").replace(/_/g, "/");
  while (s.length % 4) s += "=";
  const bin = atob(s);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}
