//Yandex.Map
var myMap;
  // Wait till API and DOM are loaded.
  ymaps.ready(init);

function init () {
    // Создание экземпляра карты и его привязка к контейнеру с
    // заданным id ("map").
    myMap = new ymaps.Map('map', {
        // При инициализации карты обязательно нужно указать
        // её центр и коэффициент масштабирования.
        center:[59.938631, 30.323055], // Coordinates of our address
        zoom:17,
        controls: ['zoomControl']
    });

    myPlacemark = new ymaps.Placemark([59.938631, 30.323055], {
    }, {

      iconLayout: 'default#image',
      

    });

    myMap.geoObjects.add(myPlacemark);

    document.getElementById('destroyButton').onclick = function () {
        // Для уничтожения используется метод destroy.
        myMap.destroy();
    };
}
