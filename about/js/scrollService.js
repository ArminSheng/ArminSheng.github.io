// creates a global "addWheelListener" method
// example: addWheelListener( elem, function( e ) { console.log( e.deltaY ); e.preventDefault(); } );
(function(window,document) {

  var prefix = "", _addEventListener, onwheel, support;

  // detect event model
  if ( window.addEventListener ) {
    _addEventListener = "addEventListener";
  } else {
    _addEventListener = "attachEvent";
    prefix = "on";
  }

  // detect available wheel event
  support = "onwheel" in document.createElement("div") ? "wheel" : // 浏览器都支持"wheel"
            document.onmousewheel !== undefined ? "mousewheel" : // Webkit 和 IE一定支持"mousewheel"
            "DOMMouseScroll"; // 低版本firefox

  window.addWheelListener = function( elem, callback, useCapture ) {
    _addWheelListener( elem, support, callback, useCapture );

    // handle MozMousePixelScroll in older Firefox
    if( support == "DOMMouseScroll" ) {
        _addWheelListener( elem, "MozMousePixelScroll", callback, useCapture );
    }
  };

  function _addWheelListener( elem, eventName, callback, useCapture ) {
    elem[ _addEventListener ]( prefix + eventName, support == "wheel" ? callback : function( originalEvent ) {
      !originalEvent && ( originalEvent = window.event );

      // create a normalized event object
      var event = {
        // keep a ref to the original event object
        originalEvent: originalEvent,
        target: originalEvent.target || originalEvent.srcElement,
        type: "wheel",
        deltaMode: originalEvent.type == "MozMousePixelScroll" ? 0 : 1,
        deltaX: 0,
        deltaZ: 0,
        preventDefault: function() {
          originalEvent.preventDefault ?
          originalEvent.preventDefault() :
          originalEvent.returnValue = false;
        }
      };

      // calculate deltaY (and deltaX) according to the event
      if ( support == "mousewheel" ) {
        event.deltaY = - 1/40 * originalEvent.wheelDelta;
        // Webkit also support wheelDeltaX
        originalEvent.wheelDeltaX && ( event.deltaX = - 1/40 * originalEvent.wheelDeltaX );
      } else {
        event.deltaY = originalEvent.detail;
      }

      // it's time to fire the callback
      return callback( event );

    }, useCapture || false );
  }

})(window,document);

var current = 0,
    isScroll = false,
    downing = false;

function pageScroll(e, len, indicators) {
  // detect whether the page is on scrolling
  if (isScroll) {
    return;
  }else {
    isScroll = true;
  }

  downing = e.deltaY > 0 ? true : false;
  if (!downing) {
    if (current-1 < 0) {
      isScroll = false;
      return;
    }

    current--;
    current = current < 0 ? 0 : current;
    currentChange(current);
  } else {
    if (current > len) {
        return;
    }

    current++;
    current = (current <= len-1) ? current : len -1;
    currentChange(current);
  }

  e.preventDefault();

}

function currentChange(current) {
  indicators[current].checked = true;

  setTimeout(function() {
    isScroll = false;
  }, 1100);
}
