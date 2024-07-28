---
layout: page
title:Blogs
permalink: /blog/
---

Here's a collection of my thoughts on various topics.

<ul>
  {% for post in site.posts %}
    <li>
      <h2><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h2>
      <p>{{ post.date | date: "%B %d, %Y" }}</p>
      {% if post.description %}
        <p>{{ post.description }}</p>
      {% else %}
        <p>{{ post.excerpt | strip_html | truncate: 160 }}</p>
      {% endif %}
    </li>
  {% endfor %}
</ul>
