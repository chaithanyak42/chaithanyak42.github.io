---
layout: page
title: Blog
permalink: /blog/
---

{% for post in site.posts %}
  <article class="post-preview">
    <h3 class="post-title">
      <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
    </h3>
    <div class="post-meta">
      {{ post.date | date: "%B %-d, %Y" }}
    </div>
  </article>
{% endfor %}
