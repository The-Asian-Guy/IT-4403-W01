$(document).ready(function() {
  loadBookshelf();

  function loadBookshelf() {
    const bookshelf = JSON.parse(localStorage.getItem("bookshelf")) || [];
    if (bookshelf.length > 0) {
      displayBooks(bookshelf);
    } else {
      $("#bookshelf-container").html("<p>No books in your bookshelf yet.</p>");
    }
  }

  function displayBooks(books) {
    $("#bookshelf-container").empty();
    books.forEach(function(book) {
      const bookElement = `
        <div class="book">
          <img src="${book.thumbnail}" alt="${book.title}">
          <h3>${book.title}</h3>
          <p>${book.authors}</p>
        </div>
      `;
      $("#bookshelf-container").append(bookElement);
    });
  }
});