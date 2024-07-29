document.addEventListener('DOMContentLoaded', function() {
    var searchInput = document.getElementById('search-input');
    var articles = document.getElementsByTagName('article');
  
    searchInput.addEventListener('input', function() {
      var searchTerm = this.value.toLowerCase();
  
      Array.from(articles).forEach(function(article) {
        var title = article.getElementsByTagName('h2')[0].textContent.toLowerCase();
        var content = article.getElementsByTagName('p')[1].textContent.toLowerCase();
  
        if (title.includes(searchTerm) || content.includes(searchTerm)) {
          article.style.display = '';
        } else {
          article.style.display = 'none';
        }
      });
    });
  });