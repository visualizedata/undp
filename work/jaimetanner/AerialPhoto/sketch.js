function setup() {
  $(document).ready(function() {
    //female farms 
    $("div.bottom p.subtitle b:first").mouseover(function() {
      $(".top div.half").css("-webkit-filter", "grayscale(100%)");
      // $(".top div.half").css("background", "rgba(180, 80, 80, .5)");
      $(".top div.half").css("filter", "grayscale(100%)");
      $(".top div.half").css("border-style", "solid");
      $(".top div.half").css("border-width", "5px");
      $(".top div.half").css("border-color", "Maroon");
      $(".top div.half").css("color", "Maroon");
    });
    $("div.bottom p.subtitle b").mouseout(function() {
      $(".top div.half").css("-webkit-filter", "none");
      $(".top div.half").css("filter", "none");
      $(".top div.half").css("border-style", "none");
      $(".top div.half").css("border-width", "none");
    });
    //30%

  });

}

function draw() {

}