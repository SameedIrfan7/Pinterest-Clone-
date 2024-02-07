$(".feeds").scroll(function () {
  if ($(this).scrollTop() > 50) {
    $(".outer-search").addClass("doShadow");
  } else {
    $(".outer-search").removeClass("doShadow");
  }
});