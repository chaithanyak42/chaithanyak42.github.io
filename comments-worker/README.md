# Comments backend

Login-free comments for chaithanyak42.com, running on Cloudflare. Comments go live immediately and the owner gets an email for each one.

- `worker.js` is deployed as the Worker `site-comments`, served at https://comments.chaithanyak42.com
- Storage: D1 database `site-comments` (table `comments`). Stores page, name, comment, timestamp, visible flag. No email, no IP.
- Spam: Cloudflare Turnstile (widget `site-comments`) plus a honeypot field and a 3-per-minute per-IP rate limit.
- Notifications: Cloudflare Email Routing, sent from comments@chaithanyak42.com to the owner via the `EMAIL` send_email binding.
- Clean-up: https://comments.chaithanyak42.com/admin to hide or delete a comment, protected by Cloudflare Access (email one-time code, owner only). The Worker also verifies the Access JWT itself.
- Front end: `_includes/comments.html`, enabled on a page with `comments: true` in its front matter. Config in `_config.yml` under `comments:`.

To redeploy after editing `worker.js`, upload it as a module Worker with bindings DB (D1), TURNSTILE_SECRET, ACCESS_AUD, ACCESS_TEAM, OWNER_EMAIL, EMAIL (send_email) and the RATE_LIMIT rate-limit binding.
