var input = document.getElementsByName('input')[0];
var buttons = document.getElementsByName('button');
var left_in = document.getElementById('left-in');
var right_in = document.getElementById('right-in');
var sortBtn = document.getElementById('bubble-sort');
var container = document.getElementById('cont');
var que = new Queue();

function init() {

  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function() {
      input.value = input.value.trim();
      if (this.id === 'left-in') {
        if (input.value == '' || isNaN(input.value)) {
          alert('请输入数字');
          return false;
        }
        var node = createNode(input.value);
        node.className = 'btn-default left-in';
        que.oPush(node);
        console.log(que.length);

      } else if (this.id === 'right-in') {
        if (input.value == '' || isNaN(input.value)) {
          alert('请输入数字');
          return false;
        }
        var node = createNode(input.value);
        node.className = 'btn-default right-in';
        addChild(node, true);
        que.oPush(node);
      } else if (this.id === 'left-out') {
        removeChild(container.firstChild);
      } else if (this.id === 'right-out') {
        removeChild(container.lastChild);
      }
    });
  }

  sortBtn.addEventListener('click', function() {
    que.bubbleSort();
  });
}
init();

/**
 * Constructor queue
 * Mimic data structure of the queue
 */
function Queue() {
  var queue = [];

  queue.oPush = function(element) {
    queue.push(element);
    addChild(element);
    // console.log(element);
  }

  queue.oShift = function() {
    var rm = queue.shift();
    // removeChild(rm);
    return rm;
  }

  // sort by bubbleSort
  queue.bubbleSort = function() {
    var i=0, l = que.length;
    var time = 100;

    if (l <= 0) {
      return;
    }
    while(i < que.length-1) {
      for (var j = i; j < que.length; j++) {
        if (que[i].val > que[j].val) {
          // exquechange value
          que[i] = [que[j], que[j]=que[i]][0];
        }

        // render();
        time += 100;
        setTimeout(render, time);
      }


      i++;
    }

  }

  return queue;
}

function render() {
  container.innerHTML = '';
  for (var i = 0; i < que.length; i++) {
    addChild(que[i], true);
    console.log(que[i].val);
  }
}


/* create a node and add event listener to it
 * @params {int}  node value
 * @return {Object} HTML node object
 */
function createNode(value) {
  var ele = document.createElement('button');
  ele.style.height = value*3 + 'px';
  ele.val = value;
  ele.className = 'btn-default';
  ele.addEventListener('click', function() {
    removeChild(ele);
    que.oShift();
  });

  return ele;
}

/*
 * Add a child to container
 * @params {bool} append a child as the lastest node of the contaniner: type = true
 * default: insert a child before the first child of the container
 */
function addChild(node, type) {
  if (type) {
    container.appendChild(node);
  } else {
    container.insertBefore(node, container.childNodes[0]);
  }
}

/* remove a child from container */
function removeChild(node) {
  // whether the node is exist
  if (!node) {
    return;
  }

  node.style.opacity = 0;
  alert(node.innerHTML);
  setTimeout(remove(node), 500);

  function remove(node) {
    container.removeChild(node);
  }
}