---
layout: page
title: Blog
permalink: /blog/
---

<div class="tag-list">
  {% assign tags = site.tags | sort %}
  {% for tag in tags %}
    <a href="#{{ tag[0] | slugify }}" class="tag-link">{{ tag[0] }}</a>
  {% endfor %}
</div>

<div class="search-container">
  <input type="text" id="search-input" placeholder="Search posts...">
</div>

{% for post in site.posts %}
  <article>
    <h2><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h2>
    <p>{{ post.date | date: "%B %d, %Y" }} • {{ post.content | number_of_words | divided_by: 200 | at_least: 1 }} min read</p>
    {% if post.tags %}
      <p class="tags">
        {% for tag in post.tags %}
          <a href="#{{ tag | slugify }}" class="tag">{{ tag }}</a>
        {% endfor %}
      </p>
    {% endif %}
    <p>{{ post.excerpt | strip_html | truncate: 160 }}</p>
  </article>
{% endfor %}
