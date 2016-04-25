/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = ''
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};
// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: 0,
  nowGraTime: "day"
}
var arrTime = ['day'];
// var arrCity = [0];

// 渲染容器
var container = document.getElementById('chart');

/**
 * 渲染图表
 */
function renderChart(data) {
  var chart = '';

  // set data
  for (var i in data) {
    chart += "<span class='chart-data chart-"+ pageState.nowGraTime +"' style='background-color: "+ getColor(data[i]) +"; height: " + data[i] + "px' title='"+ i + ", " + data[i] +"'></span>";
  }

  // rendering the DOM
  container.innerHTML = chart;
}
// Get bg-color of a colum
function getColor(data) {
  if (data < 500 && data >= 400) {
    return 'black';
  } else if (data >= 300) {
    return 'purple';
  } else if (data >= 200) {
    return 'red';
  } else if (data >= 100) {
    return 'blue';
  } else {
    return 'green';
  }
}
/**
 * 日、周、月的radio事件点击时的处理函数
 */

function graTimeChange() {
  // 确定是否选项发生了变化
  arrTime.push(pageState.nowGraTime);
  if(arrTime[1] && arrTime[0] === arrTime[1]) {
    arrTime.shift();
    return;
  }
  arrTime.shift();

  // 设置对应数据
  chartData = aqiSourceData[aqiCityArr[pageState.nowSelectCity]];
  chartData = convertData(pageState.nowGraTime, chartData) || chartData;

  // 调用图表渲染函数
  renderChart(chartData);
}

function convertData(type, data) {
  var returnData = {};

  if (type === 'month') {
    var month;
    var arr1 = [], arr2 = [], arr3 = [];

    for (var i in data) {
      month = Number(i.substr(5,2));
      if (month === 1) {
        arr1.push(data[i]);
      } else if (month === 2) {
        arr2.push(data[i]);
      } else {
        arr3.push(data[i]);
      }
    }

    returnData['2016-1月'] = avg(arr1);
    returnData['2016-2月'] = avg(arr2);
    returnData['2016-3月'] = avg(arr3);
  } else if (type === 'week') {
    returnData = {};
    var days = [];
    // var day = 0;
    var weekTemp = [];
    for (var i in data) {
      var month = Number(i.substr(5,2));
      // day++;
      weekTemp.push(data[i]);
      // if (weekTemp.length == 7 && month) {
      //   weekArr[weekArr.length] = weekTemp;
      // }
      days.push(data[i]);
    }
    month = {"1": 31, "2": 29, "3": 31};
    var week = [];
    // get the days of week
    function getDayOfWeek(day) {
      var weeks = {'Mon': 1, 'Tue': 2, 'Wed': 3,'Thu': 4, 'Fri': 5, 'Sat': 6, 'Sun': 7};
      return weeks[day];
    }
    for (var m in month) {
      var start = 0, end = 0;
      weekTemp = [];
      // var day = Number(month[m].substr(5,2));
      for (var k = 1; k < m; k++) {
        start += month[k];
      }
      end = start + month[m];
      var weekIdx = 0;
      for (var j = start; j < end; j++) {
        weekTemp.push(days[j]);
        if (weekTemp.length === 7) {

          week.push(weekTemp);
          weekIdx++;

          // set returnData object
          returnData['2016-'+m+'月第'+weekIdx+'周'] = avg(weekTemp);

          // reset weekTmp array
          weekTemp=[];
        }
      }
    }
  } else {
    // default by day
    returnData = false;
  }

  return returnData;
}
// caculate average value
function avg(arr) {
  var sum = 0;
  for (var i = 0; i < arr.length; i++) {
    sum += Number(arr[i]);
  }

  return Math.round(sum/arr.length);
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
  // 设置对应数据
  chartData = aqiSourceData[aqiCityArr[pageState.nowSelectCity]];
  chartData = convertData(pageState.nowGraTime, chartData) || chartData;

  // 调用图表渲染函数
  renderChart(chartData);
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
  var radios = document.getElementsByTagName('input');
  for (var i = 0; i < radios.length; i++) {
    if (radios[i].name && radios[i].name === 'gra-time') {
      radios[i].addEventListener('click', function () {
        pageState.nowGraTime = this.value;
        graTimeChange();
      });
    }
  }
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
 var aqiCityArr = [];
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项

  var selecter = document.getElementById('city-select');

  for (var key in aqiSourceData) {
    aqiCityArr.push(key);
    selecter.innerHTML += '<option>' + key + '</option>';
  }

  // 给select设置事件，当选项发生变化时调用函数citySelectChange
  selecter.addEventListener('change', function() {
    pageState.nowSelectCity = this.selectedIndex;
    citySelectChange();
  });
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  // 处理好的数据存到 chartData 中
}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm()
  initCitySelector();
  initAqiChartData();
}

init();
