(function() {
  const dateHtmlElements = document.querySelectorAll(".CSSdate");
  const now = new Date();

  function formatDisplayDate(date) {
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${month}월 ${day}일`;
  }

  function updateDateDisplay() {
    const formattedDate = formatDisplayDate(now);
    dateHtmlElements.forEach(el => {
      el.innerHTML = formattedDate;
    });
  }

  updateDateDisplay();
})();