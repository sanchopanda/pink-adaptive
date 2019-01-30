adaptiveMenu();

function adaptiveMenu() {
  var toggle = document.querySelector(".toggle");
  var nav = document.querySelector(".main-nav__list");
  var pageHead = document.querySelector(".page-header__head");
  toggle.addEventListener("click", function(event){
      event.preventDefault();
      toggle.classList.toggle("toggle--close");
      nav.classList.toggle("main-nav__list--open");
      pageHead.classList.toggle("page-header__head--open");
  });
};
