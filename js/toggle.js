adaptiveMenu();

function adaptiveMenu() {
  var toggle = document.querySelector(".toggle");
  toggle.addEventListener("click", function(event){
      event.preventDefault();
      toggle.classList.toggle("toggle--close");
  });
};
