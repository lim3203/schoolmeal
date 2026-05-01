(function() {
  const searchInput = document.querySelector(".gSearch");
  const searchButton = document.querySelector(".gSearchButton");

  function performSearch() {
    const query = searchInput.value.trim();
    if (query) {
      const url = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
      window.open(url, "_blank");
    }
  }

  searchButton.addEventListener("click", performSearch);

  searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      performSearch();
    }
  });
})();