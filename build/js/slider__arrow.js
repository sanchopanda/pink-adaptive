sliderArrow();

function sliderArrow() {
  var arrowLeft = document.querySelector(".slider__arrow--left");
  var arrowRight = document.querySelector(".slider__arrow--right");
  var sliderRadio = document.querySelectorAll(".slider__radio");
  arrowRight.addEventListener("click", function(event){
      event.preventDefault();
      for (var i = 0; i < sliderRadio.length; i++) {
        if(sliderRadio[i].checked) {
          sliderRadio[i+1].checked = true;
          break;
        }
      }
  });
  arrowLeft.addEventListener("click", function(event){
      event.preventDefault();
      for (var i = 0; i < sliderRadio.length; i++) {
        if(sliderRadio[i].checked) {
          sliderRadio[i-1].checked = true;
          break;
        }
      }
  });
};
