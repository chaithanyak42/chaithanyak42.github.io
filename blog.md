---
layout: page
title: Blog
permalink: /blog/
---

{% for post in site.posts %}
  <article class="post-preview">
    <h2 class="post-title">
      <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
    </h2>
    <div class="post-meta">
      {{ post.date | date: "%B %-d, %Y" }}
    </div>
  </article>
{% endfor %}
