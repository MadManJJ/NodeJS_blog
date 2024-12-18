document.addEventListener("DOMContentLoaded", function () {
  const allButtons = document.querySelectorAll(".searchBtn");
  const searchBar = document.querySelector(".searchBar");
  const searchInput = document.getElementById("searchInput");
  const searchClose = document.getElementById("searchClose");
  for (var i = 0; i < allButtons.length; i++) {
    allButtons[i].addEventListener("click", function () {
      searchBar.style.visibility = "visible";
      searchBar.classList.add("open");
      document.body.classList.add("blur");
      searchInput.focus();
    });
  }

  searchClose.addEventListener("click", function () {
    searchBar.style.visibility = "hidden";
    searchBar.classList.remove("open");
    document.body.classList.remove("blur");
  });
  document.addEventListener("click", function (event) {
    if (
      !searchBar.contains(event.target) &&
      !event.target.classList.contains("searchBtn")
    ) {
      searchBar.style.visibility = "hidden";
      searchBar.classList.remove("open");
      document.body.classList.remove("blur");
    }
  });
});
