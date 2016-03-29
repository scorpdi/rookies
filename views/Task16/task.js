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
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
	var city = document.querySelector("#aqi-city-input"),
		quality = document.querySelector("#aqi-value-input");
	
	aqiData.city = city.value.trim();
	aqiData.quality = quality.value.trim();
	
	var key = aqiData.city,
		value = aqiData.quality;
	
	aqiData.isAdd = isNull(key, value);
	
	function isNull(key, value){
		var data = [];
		data.push(key, value);
		for(var i = 0, len = data.length; i < len; i++){
			if(data[i] == "" || data[i] == undefined){
				alert("不能为空");
				return false;
			}
		}
		if(key.search(/^[\u4e00-\u9fa5|A-Za-z]+$/) == -1){
			alert("请输入中文或英文");
			return false;
		}
		if(value.search(/^-?\d+$/) == -1){
			alert("请输入整数");
			return false;
		}
		return true;
	}
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
	var table = document.querySelector("#aqi-table");
	if(aqiData.isAdd){
		var content = "<tr><td>"+aqiData.city+"</td><td>"+aqiData.quality+
					"</td><td><button onclick='delBtnHandle(this)'>删除</button></td></tr>";
		table.insertAdjacentHTML('beforeend', content);
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

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(obj) {
  // do sth.
	aqiData.isAdd = false;
	obj.parentNode.parentNode.parentNode.parentNode.removeChild(obj.parentNode.parentNode.parentNode);
  renderAqiList();
}

function init() {

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
	var addBtn = document.querySelector("#add-btn");
		addBtn.addEventListener("click", function(){
			addBtnHandle();
		}, false);
}

window.onload = function(){
	init();
};