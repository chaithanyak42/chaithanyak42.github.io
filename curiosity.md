---
layout: page
title: Curiosity
permalink: /curiosity/
---

A curated collection of everything that has shaped my thinking - from essays and books to blogs and videos. Think of it as my personal knowledge vault of intellectual treasures that I keep revisiting.

<!-- Search Box -->
<div class="search-container">
  <input 
    type="text" 
    id="searchInput" 
    placeholder="Search by title, author, or tags..."
    class="search-box"
  >
</div>

<!-- Main Content -->
<div class="reading-list">
  {% for item in site.curiosity reversed %}
    <article class="reading-item" data-title="{{ item.title | downcase }}" data-author="{{ item.author | downcase }}" data-tags="{{ item.tags | join: ' ' | downcase }}">
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

<!-- Archives Section -->
<div class="archives">
  <h2>Archives</h2>
  {% assign postsByYearMonth = site.curiosity | group_by_exp:"item", "item.date | date: '%B %Y'" %}
  {% for yearMonth in postsByYearMonth %}
    <div class="archive-group">
      <h3>{{ yearMonth.name }}</h3>
      <ul>
        {% for item in yearMonth.items %}
          <li>
            <a href="{{ item.link }}" target="_blank">{{ item.title }}</a>
            <span class="archive-author">by {{ item.author }}</span>
          </li>
        {% endfor %}
      </ul>
    </div>
  {% endfor %}
</div>

<style>
  .search-container {
    margin-bottom: 2em;
  }

  .search-box {
    width: 100%;
    padding: 0.8em;
    font-size: 1em;
    border: 1px solid #ddd;
    border-radius: 4px;
    margin-bottom: 1em;
  }

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

  .archives {
    margin-top: 3em;
    padding-top: 2em;
    border-top: 2px solid #eee;
  }

  .archive-group {
    margin-bottom: 2em;
  }

  .archive-group h3 {
    color: #555;
    margin-bottom: 0.5em;
  }

  .archive-group ul {
    list-style: none;
    padding-left: 0;
  }

  .archive-group li {
    margin-bottom: 0.5em;
  }

  .archive-author {
    font-size: 0.9em;
    color: #666;
    margin-left: 0.5em;
  }
</style>

<script>
document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.getElementById('searchInput');
  const items = document.querySelectorAll('.reading-item');

  searchInput.addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();

    items.forEach(item => {
      const title = item.dataset.title;
      const author = item.dataset.author;
      const tags = item.dataset.tags;

      const shouldShow = 
        title.includes(searchTerm) || 
        author.includes(searchTerm) || 
        tags.includes(searchTerm);

      item.style.display = shouldShow ? 'block' : 'none';
    });
  });
});
</script>