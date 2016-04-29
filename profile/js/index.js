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

    addWheelListener(window, function(e) {
      deltaY ++;
      if (deltaY > 2) {
        deltaY = 0;
      }else {
        return;
      }

      if (e.deltaY < 0) {
        current--;
        current = current < 0 ? 0 : current;
        // pageScroll(container, scroll);
        pageScroll(current, 'previous');
      } else {
        current++;
        current = current < len-1 ? current : len-1;
        // pageScroll(container, scroll);
        pageScroll(current, 'next');
      }
      e.preventDefault();
    });
  }
}

function pageScroll(current) {
  console.log(current);
  if (arguments[arguments.length - 1] = 'next') {
    indicators[current].checked = true;
    return;
  } else if (arguments[arguments.length - 1] = 'previous') {
    indicators[current -1].checked = true;
    return;
  }
  indicators[current].checked = true;
}