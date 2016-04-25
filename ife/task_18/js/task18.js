var input = document.getElementsByName('input')[0];
var buttons = document.getElementsByName('button');
var left_in = document.getElementById('left-in');
var right_in = document.getElementById('right-in');
var container = document.getElementById('cont');

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
      addChild(node);

    } else if (this.id === 'right-in') {
      if (input.value == '' || isNaN(input.value)) {
        alert('请输入数字');
        return false;
      }
      var node = createNode(input.value);
      node.className = 'btn-default right-in';
      addChild(node, true);
    } else if (this.id === 'left-out') {
      removeChild(container.firstChild);
    } else if (this.id === 'right-out') {
      removeChild(container.lastChild);
    }
  });
}

/* create a node and add event listener to it */
function createNode(value) {
  var btn = document.createElement('button');
  btn.innerHTML = value;
  btn.className = 'btn-default';
  btn.addEventListener('click', function() {
    removeChild(btn);
  });
  return btn;
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