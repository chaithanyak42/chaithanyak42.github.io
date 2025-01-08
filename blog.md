
---
layout: page
title: Blog
permalink: /blog/
---

{% assign current_year = site.time | date: "%Y" | to_integer %}

<h2>{{ current_year }} Posts</h2>
<div class="post-list">
  {% for post in site.posts %}
    {% assign post_year = post.date | date: "%Y" | to_integer %}
    {% if post_year == current_year %}
      <article class="post-preview">
        <h3 class="post-title">
          <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
        </h3>
        <div class="post-meta">
          {{ post.date | date: "%B %-d, %Y" }}
        </div>
      </article>
    {% endif %}
  {% endfor %}
</div>

<h2>Archives</h2>
<div class="archive-section">
  {% assign years = "" | split: "" %}
  {% for post in site.posts %}
    {% assign year = post.date | date: "%Y" | to_integer %}
    {% unless years contains year %}
      {% assign years = years | push: year %}
    {% endunless %}
  {% endfor %}
  
  {% assign years = years | sort | reverse %}
  {% for year in years %}
    {% if year != current_year %}
      <a href="/blog/{{ year }}">{{ year }}</a>{% unless forloop.last %} • {% endunless %}
    {% endif %}
  {% endfor %}
</div>
