$(document).ready(function() {
  $("#search-button").click(function() {
    const query = $("#search-query").val();
    if (query) {
      searchBooks(query);
    }
  });

  function searchBooks(query) {
    const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${query}`;

    $.get(apiUrl, function(data) {
      const books = data.items || [];
      displayBooks(books);
    });
  }

  function displayBooks(books) {
    $("#results").empty();
    books.forEach(function(book) {
      const title = book.volumeInfo.title;
      const authors = book.volumeInfo.authors ? book.volumeInfo.authors.join(", ") : "Unknown Author";
      const thumbnail = book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : "https://via.placeholder.com/128x193?text=No+Image";
      const bookId = book.id;

      const bookElement = `
        <div class="book" data-id="${bookId}">
          <img src="${thumbnail}" alt="${title}">
          <h3>${title}</h3>
          <p>${authors}</p>
          <button class="add-to-bookshelf">Add to Bookshelf</button>
        </div>
      `;

      $("#results").append(bookElement);
    });

    $(".add-to-bookshelf").click(function() {
      const bookElement = $(this).closest(".book");
      const bookId = bookElement.data("id");
      const title = bookElement.find("h3").text();
      const authors = bookElement.find("p").text();
      const thumbnail = bookElement.find("img").attr("src");

      const book = { bookId, title, authors, thumbnail };
      addToBookshelf(book);
    });
  }

  function addToBookshelf(book) {
    let bookshelf = JSON.parse(localStorage.getItem("bookshelf")) || [];
    bookshelf.push(book);
    localStorage.setItem("bookshelf", JSON.stringify(bookshelf));
  }
});