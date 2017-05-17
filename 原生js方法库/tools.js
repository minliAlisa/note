function addEvent(elem, type, handle) {   //事件绑定（绑定元素，绑定事件，绑定函数）
	if(elem.addEventListener) {			//IE8以上使用
		elem.addEventListener(type, handle, false);
	}else if(elem.attachEvent) {		//IE浏览器独有的
		elem['temp' + type + handle] = handle;
		elem[type + handle] = function () {
			elem['temp' + type + handle].call(elem);
		}
		elem.attachEvent('on' + type, elem[type + handle]);
	}else{								//无任何兼容性的函数。
		elem['on' +type] = handle;
	}
}

function getElementPosition(ele) {//获取鼠标位置坐标。
	var x = 0,
		y = 0;
	while (ele != document.body) {
		x += ele.offsetLeft;
		y += ele.offsetTop;
		ele = ele.offsetParent;
	}
	return {
		x: x,
		y: y
	}
}

function removeEvent(elem, type, handle) {//解除事件绑定
	if(elem.removeEventLister) {
		elem.removeEventListener(type, handle, false);
	}else if(elem.detachEvent) {
		elem.detachEvent('on' + type, handle);
	}else{
		elem['on' + type] = null;
	}
}

function stopBubble(event) {//阻止冒泡
	var event = event || window.event;
	if(event.stopPropagation) {
		event.stopPropagation();
	}else{
		event.cancelBubble = true;
	}
}

function cancelHandler(event) {//取消默认事件。
	var event = event || window.event;
	if(event.preventDefault) {
		event.preventDefault();
	}else{
		event.returnValue = false;
	}
}

function getScrollOffset() {//计算滚轮滚动距离。
	if (window.pageYOffset) {
		return {
			x: window.pageXOffset,
			y: window.pageYOffset
		}
	}
	return {
		x: document.documentElement.scrollLeft + document.body.scrollLeft,
		y: document.documentElement.scrollTop + document.body.scrollTop
	}
}

function getViewportOffset() {//计算可视窗口的位置

	if(window.innerWidth) {
		return{
			w:window.innerWidth,
			h:window.innerHeight
		}
	}
	if(document.compatMode == "CSS1Compat") {//判断是否为标准模式
		return{
			w: document.documentElement.clientWidth,
			h: document.documentElement.clientHeight
		}
	}else if(document.compatMode == "BackCompat") {//判断是否为混杂模式
			return{
				w: document.body.clientWidth,
				h: document.body.clientHeight
			}
	}
}
 
function getElementOffset(ele) {//计算元素的几何尺寸
	var box = ele.getBoundingClientRect();
	var w = box.width || (box.right - box.left);
	var h = box.height ||(box.bottom - box.top);
	return{
		w: w,
		h: h
	}
}

function getElementPosition(ele) {//计算元素位置
	var x = 0,
		y = 0;
	while(ele != document.body) {
		x += ele.offsetLeft;
		y + ele.offsetTop;
		ele = ele.offsetParent;
	}
	return{
		x : x,
		y : y
	}
}

function getStyle(obj, styleProp) {//查看元素样式
	if(obj.currentStyle) {//注意styleprop是元素属性，要写成字符串样式。
		return obj.currenntStyle[styleProp];
	}else{
		return window.getComputedStyle(obj, null)[styleProp];
	}
}

function scriptLoaded(url, callback) {//判断脚本是否加载完成。
	var script = document.createElement('script');
	script.type = "type/javascript";
	if(script.readyState) {//IE
		script.onreadystatechnge = function () {
			if(readyState == "loaded" || readyState == "complete") {
				callback();
			}
		}
	}else{//chrome safari opera firfox
		script.onload = function () {
			callback();
		}
	}
	script.src = url;
	document.head.appendChild(script);
}

function Ajax (method, address, flag ,callBack, data){
	//封装好的AJAX 打开方式 地址 是否异步 回调函数 数据
	var xhr = null;
	if(window.XMLHttpRequest) {
		xhr = new XMLHttpRequest();
	}else{
		xhr = new ActiveXObject('Microsoft.XMLHttp')
	}
	if(method == 'get') {
		xhr.open('get', address, flag);
		xhr.send();
	}else if(method == 'post') {
		xhr.open('post', address, flag);
		xhr.setRequestHeader('content-type','application/x-www-form-urlencoded');
		xhr.send(data);
	}
	xhr.onreadyststechange = function() {
		if(xhr.readyState == 4) {
			if(xhr.status == 200) {
				callBacks(xhr.responseText);
			}else{
				alert('出错了，Err: ' + xhr.status);
			}
		}
	}
}