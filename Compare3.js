$(document).ready(function() {
  let currentPage = 1;
  const resultsPerPage = 10; // Adjust to change the number of results per page

  // Click event for the search button
  $("#search-button").click(function() {
    const query = $("#search-query").val().trim();
    if (query) {
      searchBooks(query, currentPage);
    }
  });

  // Function to search books
  function searchBooks(query, page) {
    const startIndex = (page - 1) * resultsPerPage;
    const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${query}&startIndex=${startIndex}&maxResults=${resultsPerPage}`;

    // Make the API request
    $.get(apiUrl, function(data) {
      const books = data.items || [];
      displayBooks(books);
      setupPagination(data.totalItems, query);
    });
  }

  // Function to display books
  function displayBooks(books) {
    $("#results").empty();  // Clear previous results

    books.forEach(function(book) {
      const title = book.volumeInfo.title;
      const authors = book.volumeInfo.authors ? book.volumeInfo.authors.join(", ") : "Unknown Author";
      const thumbnail = book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : "https://via.placeholder.com/128x193?text=No+Image";
      const bookId = book.id;
      const bookDetailsLink = `book-details.html?id=${bookId}`;

      const bookElement = `
        <div class="book" data-id="${bookId}">
          <a href="${bookDetailsLink}">
            <img src="${thumbnail}" alt="${title}">
            <h3>${title}</h3>
          </a>
          <p>${authors}</p>
        </div>
      `;

      $("#results").append(bookElement);
    });
  }

  // Function to setup pagination
  function setupPagination(totalItems, query) {
    const totalPages = Math.ceil(totalItems / resultsPerPage);
    const paginationHtml = generatePaginationControls(totalPages, query);
    $("#pagination").html(paginationHtml);
  }

  // Function to generate pagination controls
  function generatePaginationControls(totalPages, query) {
    let paginationHtml = `<label for="page-select">Page:</label>
                          <select id="page-select">`;

    for (let i = 1; i <= totalPages; i++) {
      paginationHtml += `<option value="${i}" ${i === currentPage ? 'selected' : ''}>${i}</option>`;
    }

    paginationHtml += `</select>`;
    paginationHtml += `</select>`;

    // Handle page selection change
    $("#page-select").change(function() {
      currentPage = parseInt($(this).val());
      searchBooks(query, currentPage);
    });

    return paginationHtml;
  }
});
