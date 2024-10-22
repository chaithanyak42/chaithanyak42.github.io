---
layout: page
title: Quotes
permalink: /quotes/
---

<div class="quotes-container">
  {% for quote in site.data.quotes %}
    <div class="quote-card">
      <div class="quote-text">"{{ quote.text }}"</div>
      <div class="quote-author">— {{ quote.author }}</div>
      <div class="quote-meta">
        <span class="quote-date">Added: {{ quote.date_added | date: "%B %d, %Y" }}</span>
        <div class="quote-tags">
          {% for tag in quote.tags %}
            <span class="tag">{{ tag }}</span>
          {% endfor %}
        </div>
      </div>
    </div>
  {% endfor %}
</div>

<style>
  .quotes-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
    padding: 20px;
  }
  .quote-card {
    background-color: #ffffff;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    padding: 20px;
    transition: transform 0.3s ease;
  }
  .quote-card:hover {
    transform: translateY(-5px);
  }
  .quote-text {
    font-size: 18px;
    font-style: italic;
    color: #333;
    margin-bottom: 15px;
  }
  .quote-author {
    font-weight: bold;
    color: #555;
    margin-bottom: 10px;
  }
  .quote-meta {
    font-size: 14px;
    color: #777;
  }
  .quote-date {
    display: block;
    margin-bottom: 5px;
  }
  .quote-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
  }
  .tag {
    background-color: #f0f0f0;
    color: #555;
    padding: 3px 8px;
    border-radius: 15px;
    font-size: 12px;
  }
</style>