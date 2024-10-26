---
layout: page
title: Curiosity
permalink: /curiosity/
---
A curated collection of everything that has shaped my thinking - from essays and books to blogs and videos. Think of it as my personal knowledge vault of intellectual treasures that I keep revisiting.

<div class="reading-list">
  {% for item in site.reading reversed %}
    <article class="reading-item">
      <h3>
        <a href="{{ item.link }}" target="_blank">{{ item.title }}</a>
      </h3>

      <div class="metadata">
        <span class="type">{{ item.type }}</span> • 
        <span class="author">by {{ item.author }}</span> • 
        <span class="date">{{ item.date | date: "%B %Y" }}</span>
      </div>

      {% if item.tags %}
        <div class="tags">
          {% for tag in item.tags %}
            <span class="tag">{{ tag }}</span>
          {% endfor %}
        </div>
      {% endif %}

      {% if item.notes %}
        <p class="notes">{{ item.notes }}</p>
      {% endif %}
    </article>
  {% endfor %}
</div>

<style>
  .reading-item {
    margin-bottom: 2em;
    padding-bottom: 1em;
    border-bottom: 1px solid #eee;
  }
  .metadata {
    font-size: 0.9em;
    color: #666;
    margin: 0.5em 0;
  }
  .tags {
    margin: 0.5em 0;
  }
  .tag {
    background: #f0f0f0;
    padding: 0.2em 0.6em;
    border-radius: 3px;
    font-size: 0.8em;
    margin-right: 0.5em;
  }
  .notes {
    font-size: 0.9em;
    margin-top: 0.5em;
  }
</style>