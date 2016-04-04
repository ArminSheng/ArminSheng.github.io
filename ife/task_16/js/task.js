/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/**
 * trim操作去除string中的空格
 */
String.prototype.trim = function() {
  var str = this;
  str = str.replace(/\s+/g, '');
  return str;
}

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
  var city = document.getElementById('aqi-city-input').value;
  var value = document.getElementById('aqi-value-input').value;

  // 去除字符串中的空格
  city = city.trim();
  value = value.trim();

  aqiData[city] = value;
}
// addAqiData();
// renderAqiList(aqiData);

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
  // initialize table
  document.getElementById('aqi-table-body').textContent='';

  for (var i in aqiData) {
    addElement({
      city: i,
      value: aqiData[i]
    });
  }

  // 向table中添加一行
  function addElement(cityObj) {
    var tr = document.createElement('tr');
    var cityTd = document.createElement('td');
    var valTd = document.createElement('td');
    var deleTd = document.createElement('td');
    var btn = document.createElement('button');

    cityTd.innerHTML = cityObj.city;
    valTd.innerHTML = cityObj.value;
    btn.innerHTML = '删除';

    // 为button绑定事件，实现删除
    btn.addEventListener('click', function deleteHandle() {
      delete aqiData[cityObj.city];
      renderAqiList();
    });

    deleTd.appendChild(btn);
    tr.appendChild(cityTd);
    tr.appendChild(valTd);
    tr.appendChild(deleTd);

    document.getElementById('aqi-table-body').appendChild(tr);
  }
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  renderAqiList();
}

function init() {
  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
  document.getElementById('add-btn').addEventListener('click', addBtnHandle);
}

init();
