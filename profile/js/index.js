window.onload = init();
var indicators = document.getElementsByName('scroll'),
    len = document.getElementsByName('section').length;

function init() {
  // add wheel listener
  if (window.addWheelListener) {
    var current = 0,
        deltaY = 0,
        flag = false,
        container = document.querySelector('#scroll');

    addWheelListener(container, function(e) {
      pageScroll(e, len, indicators);
    }, true);
  }
}

