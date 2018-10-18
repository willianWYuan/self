var Common = function() {
	this.host = '127.0.0.1'
}



Common.prototype.log = function(str) {
	console.log(str)
}


// 获取 是否移动设备
Common.prototype.device = function(str) {
	str = str || /android|phone|pad/;
	if (navigator.userAgent.toLowerCase().match(str)) return true;
	else return false;
}

// 截取地址栏
Common.prototype.cuturl = function(argumentStr) {
	var href = location.href.split('?')[1];
	if (!href) return;
	href = href.split(/&+/g);
	var newObj = {};
	for (var i = 0; i < href.length; i++) {
		newObj[href[i].split('=')[0]] = href[i].split('=')[1]
	}
	return typeof argumentStr == 'undefined' ? newObj : newObj[argumentStr];
}


Common.prototype.getstyle = function(elem, type) {
	var style = elem.currentStyle ? elem.currentStyle[type] : window.getComputedStyle(elem, null)[type];
	return style;
}


// 转 Escape
Common.prototype.escape = function(str) {
	str = str.replace(/&/g, '&amp;');
	str = str.replace(/</g, '&lt;');
	str = str.replace(/>/g, '&gt;');
	str = str.replace(/'/g, '&acute;');
	str = str.replace(/"/g, '&quot;');
	str = str.replace(/\|/g, '&brvbar;');
	str = str.replace(/[\n\r]/g, '<br>');
	str = str.replace(/\s/g, '&nbsp;');
	return str;
}

// 格式化时间
Common.prototype.formattime = function(timeStamp, argumentType, argumentStyle) {
	var type, style;
	if (typeof argumentType == 'number') {
		type = argumentType;
		style = argumentStyle || '-';
	} else {
		type = 0;
		style = typeof argumentType == 'undefined' ? '-' : argumentType;
	}
	var now = new Date(timeStamp);
	var year = now.getFullYear();
	var month = ("0" + (now.getMonth() + 1)).match(/\d{2}$/)[0];
	var date = ("0" + now.getDate()).match(/\d{2}$/)[0];
	var hour = ("0" + now.getHours()).match(/\d{2}$/)[0];
	var minute = ("0" + now.getMinutes()).match(/\d{2}$/)[0];
	var second = ("0" + now.getSeconds()).match(/\d{2}$/)[0];
	var str;
	if (type == 0) str = year + style + month + style + date + ' ' + hour + ':' + minute + ':' + second;
	if (type == 1) str = year + style + month;
	if (type == 2) str = year + style + month + style + date;
	if (type == 3) str = hour + ':' + minute + ':' + second;
	now = year = month = date = hour = minute = second = obj = type = style = null;
	return str;
}


// 倒计时  根据终点时间 倒计                   site.countdown(root, (new Date('2018-09-02 15:46').getTime() - new Date().getTime()) / 1000)
Common.prototype.countdown = function(elem, timeStamp, callback) { // timeStamp 剩余多少秒(后台传过来)
	var timer, str, date, seconds, mintes, hours, timeFn = function() {
		timeStamp -= 1;
		if (timeStamp < 0) {
			str = '活动已结束';
			if (typeof callback == 'function') callback(elem);
			clearInterval(timer);
		} else {
			if (timeStamp > 60) {
				mintes = parseInt(timeStamp / 60);
				seconds = parseInt(timeStamp % 60);
				hours = 0;
				if (mintes > 60) {
					hours = parseInt(mintes / 60);
					mintes = parseInt(mintes % 60);
					if (hours > 24) {
						date = parseInt(hours / 24);
						hours = parseInt(hours % 24);
					}
				}
			} else {
				hours = mintes = 0;
				seconds = parseInt(timeStamp);
			}
			date = date ? date + '天' : '';
			hours = ("0" + hours).match(/\d{2}$/)[0];
			mintes = ("0" + mintes).match(/\d{2}$/)[0];
			seconds = ("0" + seconds).match(/\d{2}$/)[0];
			str = date + hours + ':' + mintes + ':' + seconds
		}
		elem.innerText = str;
	};
	timeFn();
	timer = setInterval(timeFn, 1000);
}

// 遍历函数												site.each(arr, function(item){ site.log(item) })
Common.prototype.each = function(obj, callback) {
	for (var x in obj) {
		if (!obj.hasOwnProperty(x)) continue;
		if (typeof callback == 'function') callback(obj[x], x);
	}
}

// 数组 根据属性 排序                         var newarr = site.sort(arr, '字段名')
Common.prototype.sort = function(array, string) {
	return array.sort(function(o, p) {
		var a = o[string],
			b = p[string];
		if (isNaN(a)) { // 非数字排序
			return a.localeCompare(b); // 用本地特定顺序来比较(支持中文)
		} else {
			if (a === b) return 0;
			else return a > b ? 1 : -1;
		}
	})
}



// 对象 深拷贝                                 var newarr2 = site.deepcopy(arr)
Common.prototype.deepcopy = function(object) {
	var dcfn = function(oldval, newval) {
		for (var x in oldval) {
			if (!oldval.hasOwnProperty(x)) continue;
			if (typeof oldval[x] == 'object') {
				newval[x] = oldval[x] instanceof Array ? [] : {};
				dcfn(oldval[x], newval[x]);
			} else {
				newval[x] = oldval[x];
			}
		}
	}
	var newobj = object instanceof Array ? [] : {};
	dcfn(object, newobj);
	return newobj;
}



// 鼠标滚轮 滚动                     site.wheel(function(){root.innerText = "wheelup"}, function(){root.innerText = "wheeldown"})
Common.prototype.wheel = function(callbackwheelup, callbackwheeldown) {
	var fn = function(e) {
		var delta = (e.wheelDelta && (e.wheelDelta > 0 ? 1 : -1)) || // chrome & ie
			(e.detail && (e.detail > 0 ? -1 : 1)); // firefox
		if (delta > 0) {
			if (typeof callbackwheelup == 'function') callbackwheelup();
			// console.log("wheelup");
		} else if (delta < 0) {
			if (typeof callbackwheeldown == 'function') callbackwheeldown();
			// console.log("wheeldown");
		}
	}
	document.onmousewheel = function(ev) {
		fn(ev || window.event)
	}; // chrome & ie9+
	document.DOMMouseScroll = function(ev) {
		fn(ev || window.event)
	}; // ie8
	if (document.addEventListener) document.addEventListener('DOMMouseScroll', function(ev) {
		fn(ev || window.event)
	}, false); // firefox
}



// 图片懒加载                site.lazy(document.getElementsByTagName('html')[0]);       传入滚动元素elem
Common.prototype.lazy = function(elem) {
	var getElemOffset = function(imgElem) {
		var top = imgElem.offsetTop;
		var paEle = imgElem.offsetParent; //当前ele的父元素
		while (paEle) {
			top += paEle.offsetTop;
			paEle = paEle.offsetParent;
		}
		return top;
	};
	var lazyScroll = function() {
		var lazyArr = [],
			lazyElem = document.getElementsByTagName('img');
		var lazyElemLength = lazyElem.length;
		for (var i = 0; i < lazyElemLength; i++) {
			if (!lazyElem[i].getAttribute('site-src')) continue;
			lazyArr.push(lazyElem[i]);
		}
		var st = elem.scrollTop;
		var ch = elem.clientHeight;
		for (var i = 0; i < lazyArr.length; i++) {
			var lazyTop = getElemOffset(lazyArr[i]);
			if (lazyTop <= st + ch / 10 * 11) {
				var newSrc = lazyArr[i].getAttribute('site-src');
				lazyArr[i].setAttribute('src', newSrc);
				lazyArr[i].removeAttribute('site-src');
			}
		}
	};
	lazyScroll();
	window.onscroll = lazyScroll
}


// 添加标签          					 site.tag('vue.js');
Common.prototype.tag = function(url, isBefore) {
	var newTag, isType = url.match(/\.js$/);
	if (!isType) {
		newTag = document.createElement('link');
		newTag.rel = 'stylesheet';
		newTag.type = 'text/css';
		newTag.href = url;
	} else {
		newTag = document.createElement('script');
		newTag.type = 'text/javascript';
		newTag.src = url;
	}
	var headElem = document.getElementsByTagName('head')[0];
	if (isBefore) headElem.insertBefore(newTag, headElem.childNodes[0]);
	else headElem.appendChild(newTag);
}



// 回到头部						site.backtop(elem);
Common.prototype.backtop = function(elem, speed) {
	var speed = speed || 1000;
	var currtop = elem.scrollTop;
	var pscrtime = setInterval(function() {
		currtop -= currtop / speed * 200;
		elem.scrollTop = currtop;
		if (Math.floor(currtop) <= 8) {
			clearInterval(pscrtime);
			elem.scrollTop = 0;
		}
	}, 15);
}



// imgload2size
Common.prototype.imagesize = function(imgElem) {
	var img = new Image();
	img.src = imgElem.src;
	img.onload = function() {
		if (this.width > this.height) imgElem.cssText = 'height: 100%; width: auto;';
		else imgElem.cssText = 'width: 100%; height: auto;';
	}
}



Common.prototype.getBase64Image = function(url) {
	var image = new Image();
	// image.crossOrigin = 'anonymous';
	image.src = url;
	image.onload = function() {
		var canvas = document.createElement("canvas");
		canvas.width = this.width;
		canvas.height = this.height;
		var ctx = canvas.getContext("2d");
		ctx.drawImage(this, 0, 0, this.width, this.height);
		var ext = this.src.substring(this.src.lastIndexOf(".") + 1).toLowerCase();
		var dataURL = canvas.toDataURL('image/jpeg', 0.7);
		return dataURL;
	}
}



// var s = site.specInitFn([
// 	{ specId: 1, specName: '尺寸', specValueId: 1, specValueName: 'L码' },
// 	{ specId: 1, specName: '尺寸', specValueId: 3, specValueName: 'M码' },
// 	{ specId: 1, specName: '尺寸', specValueId: 5, specValueName: 'S码' },
// 	{ specId: 1, specName: '尺寸', specValueId: 7, specValueName: 'XS码' },
// 	{ specId: 1, specName: '尺寸', specValueId: 8, specValueName: 'XL码' },
// 	{ specId: 4, specName: '颜色', specValueId: 1, specValueName: '黑色' },
// 	{ specId: 4, specName: '颜色', specValueId: 7, specValueName: '红色' },
// 	{ specId: 4, specName: '颜色', specValueId: 9, specValueName: '蓝色' },
// 	{ specId: 4, specName: '颜色', specValueId: 11, specValueName: '白色' },
// 	{ specId: 4, specName: '颜色', specValueId: 25, specValueName: '紫色' },
// 	{ specId: 8, specName: '版本', specValueId: 2, specValueName: '豪华版' },
// 	{ specId: 8, specName: '版本', specValueId: 3, specValueName: '精致版' },
// 	{ specId: 8, specName: '版本', specValueId: 5, specValueName: '经济版' },
// 	{ specId: 9, specName: '库存', specValueId: 1, specValueName: '有' },
// 	{ specId: 9, specName: '库存', specValueId: 2, specValueName: '否' },
// ])

// console.log(s)     购物车分类     转为  [1:2, 2:3, 4:8]
Common.prototype.specInitFn = function(arr) {
	let filterArr = [],
		classArr = [],
		classLen, newArr = [];
	// 分类
	arr.forEach(item => {
		if (!filterArr[item.specId]) filterArr[item.specId] = [];
		filterArr[item.specId].push(item);
	})
	// 过滤
	filterArr.forEach(item => {
		if (item) classArr.push(item);
	})
	// 生成嵌套数组
	classLen = classArr.length;
	for (var i = 0; i < classLen; i++) {
		classArr[i].forEach(item => {
			item.children = classArr[i + 1];
		})
	}
	forResultFn(classArr[0], {});
	// 生成需要的数组
	function forResultFn(itemArr, obj) {
		var specIdsStr = obj.specIds ? obj.specIds : '';
		var specNamesStr = obj.specNames ? obj.specNames : '';
		itemArr.forEach(item => {
			obj.specIds = obj.specIds ?
				specIdsStr + item.specId + ':' + item.specValueId + ',' :
				item.specId + ':' + item.specValueId + ',';
			obj.specNames = obj.specNames ?
				specNamesStr + item.specName + ':' + item.specValueName + ',' :
				item.specName + ':' + item.specValueName + ',';
			if (item.children) {
				forResultFn(item.children, obj);
			} else {
				var arrObj = {}
				arrObj.specIds = '[' + obj.specIds.replace(/,$/, '') + ']';
				arrObj.specNames = obj.specNames.replace(/,$/, '');
				newArr.push(arrObj)
			}
		})
	}
	filterArr = classArr = classLen = forResultFn = null;
	return newArr;
}



// // 1.加密  
// var str = '123456';  
// var base = new (new Common().simpleTransCoding);  
// var result = base.encode(str);  
// console.log(result);  

// //2.解密  
// var result2 = base.decode(result);  
// console.log(result2)

// 简单转码处理
Common.prototype.simpleTransCoding = function() {
	_keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
	this.encode = function(input) {
		var output = "";
		var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
		var i = 0;
		input = _utf8_encode(input);
		while (i < input.length) {
			chr1 = input.charCodeAt(i++);
			chr2 = input.charCodeAt(i++);
			chr3 = input.charCodeAt(i++);
			enc1 = chr1 >> 2;
			enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
			enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
			enc4 = chr3 & 63;
			if (isNaN(chr2)) {
				enc3 = enc4 = 64;
			} else if (isNaN(chr3)) {
				enc4 = 64;
			}
			output = output +
				_keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
				_keyStr.charAt(enc3) + _keyStr.charAt(enc4);
		}
		return output;
	}
	this.decode = function(input) {
		var output = "";
		var chr1, chr2, chr3;
		var enc1, enc2, enc3, enc4;
		var i = 0;
		input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
		while (i < input.length) {
			enc1 = _keyStr.indexOf(input.charAt(i++));
			enc2 = _keyStr.indexOf(input.charAt(i++));
			enc3 = _keyStr.indexOf(input.charAt(i++));
			enc4 = _keyStr.indexOf(input.charAt(i++));
			chr1 = (enc1 << 2) | (enc2 >> 4);
			chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
			chr3 = ((enc3 & 3) << 6) | enc4;
			output = output + String.fromCharCode(chr1);
			if (enc3 != 64) {
				output = output + String.fromCharCode(chr2);
			}
			if (enc4 != 64) {
				output = output + String.fromCharCode(chr3);
			}
		}
		output = _utf8_decode(output);
		return output;
	}
	_utf8_encode = function(string) {
		string = string.replace(/\r\n/g, "\n");
		var utftext = "";
		for (var n = 0; n < string.length; n++) {
			var c = string.charCodeAt(n);
			if (c < 128) {
				utftext += String.fromCharCode(c);
			} else if ((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			} else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}

		}
		return utftext;
	}
	_utf8_decode = function(utftext) {
		var string = "";
		var i = 0;
		var c = c1 = c2 = 0;
		while (i < utftext.length) {
			c = utftext.charCodeAt(i);
			if (c < 128) {
				string += String.fromCharCode(c);
				i++;
			} else if ((c > 191) && (c < 224)) {
				c2 = utftext.charCodeAt(i + 1);
				string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
				i += 2;
			} else {
				c2 = utftext.charCodeAt(i + 1);
				c3 = utftext.charCodeAt(i + 2);
				string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
				i += 3;
			}
		}
		return string;
	}
}



// 获取 对应的父节点        var currElem = parentsFn(ev.target, 'className');
Common.prototype.parentNodeFn = function(elem, findName) {
	var result;

	function subParentsFn(subElem) {
		if (!subElem) return;
		if (subElem.className != findName) subParentsFn(subElem.parentNode);
		else result = subElem;
	}
	subParentsFn(elem);
	return result;
}











// sessionStorage 和 cookie 浏览器存储
// 				var bdata = new Common().BrowserData();
// 				bdata.add({username: 'John', userId: 12, token: '5446iph57iaw234g33453h8235'})     添加或修改
// 				bdata.get() 获取整个对象          bdata.get('user')  获取user值
// 				bdata.del('user')  删除user值
Common.prototype.BrowserData = function() {
	var totalObj = {};
	totalObj.add = function(argumentObj) { // 添加/修改
		for (var x in argumentObj) {
			if (!argumentObj.hasOwnProperty(x)) continue;
			if (sessionStorage) sessionStorage[x] = argumentObj[x];
			else document.cookie = x + '=' + argumentObj[x];
		}
	}
	totalObj.get = function(params) { // 获取
		var obj = {};
		if (sessionStorage) {
			for (var x in sessionStorage) {
				if (!sessionStorage.hasOwnProperty(x)) continue;
				obj[x] = sessionStorage[x];
			}
		} else {
			var cookArr = document.cookie.split(/;\s?/g),
				cookArrLen = cookArr.length;
			for (var i = 0; i < cookArrLen; i++) {
				var arr1 = cookArr[i].split(/=/);
				var keys = arr1[0];
				var vals = arr1[1];
				obj[keys] = vals;
			}
		}
		return params ? obj[params] : obj;
	}
	totalObj.del = function(keys) { // 删除
		if (sessionStorage) sessionStorage.removeItem(keys);
		else document.cookie = keys + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT';
	}
	totalObj.remove = function() { // 删除全部
		if (sessionStorage) {
			for (var x in sessionStorage) {
				if (!sessionStorage.hasOwnProperty(x)) continue;
				sessionStorage.removeItem(x);
			}
		} else {
			var cookArr = document.cookie.split(/;\s?/g),
				cookArrLen = cookArr.length;
			for (var i = 0; i < cookArrLen; i++) {
				var arr1 = cookArr[i].split(/=/);
				var keys = arr1[0];
				document.cookie = keys + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT';
			}
		}
	}

	return totalObj;
}



// getAjax: function(obj) {
//     obj.type  = obj.type  !== void 0 ? obj.type  : 'GET';
//     obj.async = obj.async !== void 0 ? obj.async : true;
//     var xml = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXOject('Microsoft.XMLHTTP');
//     xml.onreadystatechange = function() {
//         if (xml.readyState == 4 && xml.status == 200) {
//             if (obj.success) obj.success(JSON.parse(xml.responseText));
//         } 
//     }
//     xml.timeout = 0;//设置过期时间（毫秒）；0代表不限制
//     xml.open(obj.type, obj.url, obj.async);
//     xml.setRequestHeader('If-Modified-Since', '0');    // 必须放在open之后，send之前
//     xml.send(JSON.stringify(data));
//     
//     
//     
//     fetch(url, json).then(res => {
//     		return res.json()
//     }).then(({data}) => {
//     		if (typeof callback == 'function') callback(data);
//     });
// }



// dom渲染完成后 才进行操作
// document.onreadystatechange = function () {
//     if (document.readyState == "complete") { 
//          console.log("complete")  
//     }
// }