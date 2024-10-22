---
layout: page
title: Quotes
permalink: /quotes/
---
{% for quote in site.data.quotes %}
<blockquote>
  <p>{{ quote.text }}</p>
  <footer>
    — <cite>{{ quote.author }}</cite>
    <br>
    <small>Added on: {{ quote.date_added | date: "%B %d, %Y" }}</small>
    <br>
    Tags: {% for tag in quote.tags %}
      <span class="tag">{{ tag }}</span>
    {% endfor %}
  </footer>
</blockquote>
{% endfor %}
<style>
  blockquote {
    border-left: 4px solid #ccc;
    margin: 1.5em 10px;
    padding: 0.5em 10px;
  }
  .tag {
    background-color: #f1f1f1;
    border-radius: 3px;
    padding: 2px 5px;
    margin-right: 5px;
    font-size: 0.8em;
  }
</style>