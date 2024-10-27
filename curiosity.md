---
layout: page
title: Curiosity
permalink: /curiosity/
---

"The important thing is not to stop questioning. Curiosity has its own reason for existence." - Einstein


A collection of essays, books, research papers, and ideas that have fundamentally altered my thinking and expanded my curiosity. Each piece chosen here has either challenged my existing beliefs or opened new avenues of thought.

<!-- Main Content -->
<div class="curiosity-grid">
  {% for item in site.curiosity reversed %}
    <article class="curiosity-item">
      <div class="item-content">
        <h3>
          <a href="{{ item.link }}" target="_blank">{{ item.title }}</a>
        </h3>

        <div class="item-meta">
          <span class="item-type">{{ item.type }}</span>
          <span class="item-author">{{ item.author }}</span>
          <time>{{ item.date | date: "%B %Y" }}</time>
        </div>

        {% if item.tags %}
          <div class="item-tags">
            {% for tag in item.tags %}
              <span class="tag">{{ tag }}</span>
            {% endfor %}
          </div>
        {% endif %}
      </div>
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
.curiosity-grid {
  margin-top: 2rem;
}

.curiosity-item {
  margin-bottom: 2.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #eee;
  transition: transform 0.2s ease;
}

.curiosity-item:hover {
  transform: translateX(5px);
}

.curiosity-item h3 {
  margin-bottom: 0.5rem;
}

.curiosity-item h3 a {
  color: #333;
  text-decoration: none;
  font-size: 1.3rem;
  font-weight: 600;
}

.curiosity-item h3 a:hover {
  color: #0066cc;
}

.item-meta {
  font-size: 0.9rem;
  color: #666;
  margin: 0.5rem 0;
  display: flex;
  gap: 1rem;
}

.item-type {
  color: #0066cc;
  font-weight: 500;
}

.item-tags {
  margin-top: 0.8rem;
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.tag {
  font-size: 0.8rem;
  padding: 0.2rem 0.6rem;
  background: #f5f5f5;
  border-radius: 3px;
  color: #666;
}

/* Archives Styling */
.archives {
  margin-top: 4rem;
  padding-top: 2rem;
  border-top: 2px solid #eee;
}

.archives h2 {
  font-size: 1.8rem;
  margin-bottom: 2rem;
  color: #333;
}

.archive-group {
  margin-bottom: 2rem;
}

.archive-group h3 {
  color: #0066cc;
  font-size: 1.2rem;
  margin-bottom: 1rem;
  font-weight: 500;
}

.archive-group ul {
  list-style: none;
  padding-left: 0;
}

.archive-group li {
  margin-bottom: 0.8rem;
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
}

.archive-group li a {
  color: #333;
  text-decoration: none;
  font-weight: 500;
}

.archive-group li a:hover {
  color: #0066cc;
}

.archive-author {
  font-size: 0.9rem;
  color: #666;
}

@media (max-width: 768px) {
  .item-meta {
    flex-direction: column;
    gap: 0.3rem;
  }

  .archive-group li {
    flex-direction: column;
    gap: 0.2rem;
  }

  .archive-author {
    margin-left: 0;
  }
}
</style>