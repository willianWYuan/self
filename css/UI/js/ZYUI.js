var UI = {
	// 获取元素
	getEle: function(Selector) {
		var newSel;
		if (Selector.indexOf('#') != -1) {
			newSel = document.getElementById(Selector.replace('#', ''));
		} else if (Selector.indexOf('.') != -1) {
			newSel = document.getElementsByClassName(Selector.replace('.', ''));
			if (newSel.length == 1) {
				newSel = newSel[0];
			} else {
				var newSelArr = [];
				for (var i = 0; i < newSel.length; i++) {
					newSelArr.push(newSel[i]);
				}
				newSel = newSelArr;
			}
		}
		return newSel;
	},
	//查找 需要的父节点
	parents: function(that, selector) {
		for (var i = 0; i < 1 / 0; i++) {
			if (that.parentNode.className == selector.className) {
				i = -1;
				return that
			} else {
				that = that.parentNode;
			}
		}
	},
	css: function(selector, obj) {
		for (var x in obj) {
			if (!obj.hasOwnProperty(x)) continue;
			selector.style[x] = obj[x];
		}
	},

	getStyle: function(el, type) {
		var style = el.currentStyle ? el.currentStyle[type] : window.getComputedStyle(el, null)[type];
		return style;
	},



	//跳转页面
	jump: function(url, n) {
		if (typeof n == 'undefined') location.href = url;
		else window.open(url);
	},
	// tab单选切换
	radio: function(ev, that, type) {
		var item = that.children;
		var tabOptions = UI.parents(ev.target, that);
		if (/\bon\b/.test(tabOptions.className)) return;
		for (var i = 0; i < item.length; i++) {
			if (typeof item[i].getAttribute('class') != 'string') continue;
			var newVal = item[i].getAttribute('class').replace(/\bon\b/g, '');
			item[i].setAttribute('class', newVal.replace(/^\s|\s$/g, ''));
		}
		var thatClass = tabOptions.className == '' ? 'on' : (tabOptions.className + ' on').replace(/\s{2,}/g, ' ');
		tabOptions.setAttribute('class', thatClass.replace(/^\s|\s$/g, ''));

		if (type == 'line') UI.tabradiosline(that);
	},
	//tab多选切换
	checkbox: function(ev, that) {
		var item = that.children;
		var tabOptions = UI.parents(ev.target, that);
		tabOptions.className = /\bon\b/.test(tabOptions.className) ?
			tabOptions.className.replace(/\bon\b/g, '').replace(/^\s|\s$/g, '') :
			tabOptions.className.replace(/^\s|\s$/g, '') + ' on';
	},
	//tab单选下边线 还有内容跟着切换
	tabradiosline: function(that) {
		var index;
		for (var i = 0; i < that.children.length; i++) {
			if (/\bon\b/.test(that.children[i].className)) index = i;
		}
		var pos = that.children[index].clientWidth * index;
		that.lastElementChild.style.left = pos + 'px';
		var cxtPos = document.body.clientWidth * index
		UI.getEle('.nav-tagcxt-inner').style.transform = 'translateX(-' + cxtPos + 'px)';
	},
	//搜索
	search: function(ev, that) {
		setTimeout(function() {
			if (ev.target.tagName.toLowerCase() != 'a') that.setAttribute('anim', true);
			else that.removeAttribute('anim')
		}, 500)
	},
	//弹窗
	alert: function(type, str) {
		var mask = UI.getEle('.page-alert-mask'); //遮罩
		var bomb = UI.getEle('.page-alert'); //弹框
		if (typeof type == 'undefined') {
			mask.removeAttribute('show');
			if (bomb instanceof Array) bomb.forEach(function(item) {
				item.removeAttribute('alertshow');
			})
			else bomb.removeAttribute('alertshow');
		} else {
			if (typeof type == 'function') {
				UI.alert();
				type(); //关闭时，执行回调函数
			} else {
				if (type != 0) mask.setAttribute('show', '');
				UI.getEle('.alert-' + type).setAttribute('alertshow', '');
				UI.getEle('.alert-' + type).style.marginTop = '-' + UI.getEle('.alert-' + type).clientHeight / 2 + 'px';
			}
		}
		//提示语自动消失
		if (type == 0) {
			UI.getEle('.alert-0').innerHTML = str;
			setTimeout(function() {
				UI.getEle('.alert-0').removeAttribute('alertshow');
			}, 3000);
		}
	},
	//获取当前系统
	navi: function(){
		var sheb = navigator.userAgent.toLowerCase().match(/iphone|android|ipad|phone|window|mac|lunix/);
		sheb = sheb == null ? void 0 : sheb[0];
		return sheb;
	},
	// 地址栏截取
	cuturl: function() {
        var href = location.href.split('?')[1].split(/&+/g);
        var newObj = {};
        for (var i = 0; i < href.length; i++) {
            newObj[href[i].split('=')[0]] = href[i].split('=')[1]
        }
        return newObj;
    },
	//回到头部
	backtop: function(speed){
		speed = speed || 3000;
		var currtop = document.querySelector('.Page').scrollTop;
		var pscrtime = setInterval(function(){
			currtop -= currtop / speed * 200;
			document.querySelector('.Page').scrollTop = currtop;
			if (Math.floor(currtop) <=0) clearInterval(pscrtime);
		}, 15);
	},
	//滚动事件 回调cb({})
	scroll: function(ev, cb) {
		if (typeof ev == 'undefined') return;
		var _this = ev.target;
		// 控制节流
		_this.onscroll = null;
		setTimeout(function() {
			_this.onscroll = function() {
				UI.scroll(event, cb)
			}
		}, 15);
		if (typeof cb == 'function') cb({
			el: _this,
			scr_t: _this.scrollTop,
			scr_l: _this.scrollLeft,
			off_w: _this.offsetWidth,
			off_h: _this.offsetHeight,
			tot_h: (function() {
				var totalh = {
					a: 0,
					s: 0
				};
				for (var i = 0; i < _this.children.length; i++) {
					if (UI.getStyle(_this.children[i], 'position') == 'absolute' || UI.getStyle(_this.children[i], 'position') == 'fixed') totalh.a = _this.children[i].offsetHeight > totalh.a ? _this.children[i].offsetHeight : totalh.a;
					else totalh.s += _this.children[i].offsetHeight;
				};
				totalh = totalh.a > totalh.s ? totalh.a : totalh.s;
				return totalh;
			}())
		})
	},

	//触摸事件 返回每个状态的位置
	touch: function(elem) {
		var te = {
			pos: {},
			fn: function(ev, callback, el) {
				switch (ev.type) {
					case 'touchstart':
						this.pos.start_x = ev.targetTouches[0].pageX;
						this.pos.start_y = ev.targetTouches[0].pageY;
						break;
					case 'touchmove':
						this.pos.move_x = ev.targetTouches[0].pageX;
						this.pos.move_y = ev.targetTouches[0].pageY;
						break;
					case 'touchend':
						this.pos.end_x = ev.changedTouches[0].pageX;
						this.pos.end_y = ev.changedTouches[0].pageY;
						break;
					case 'mousedown':
						this.pos.start_x = ev.pageX;
						this.pos.start_y = ev.pageY;
						this.pos.flog = true;
						break;
					case 'mousemove':
						if (!this.pos.flog) return;
						this.pos.move_x = ev.pageX;
						this.pos.move_y = ev.pageY;
						break;
					case 'mouseup':
						this.pos.flog = false;
						this.pos.end_x = ev.pageX;
						this.pos.end_y = ev.pageY;
						break;
				}
				if (typeof callback == 'function') callback.call(el, this.pos, ev);
			}
		};
		for (var i = 1; i < arguments.length; i++) {
			(function(obj) {
				if (obj.touchevent != 'stop') {
					if (obj.touchevent == 'down') obj.touchevent = UI.navi().match(/window|mac|linux/) ? 'mousedown' : 'touchstart';
					if (obj.touchevent == 'move') obj.touchevent = UI.navi().match(/window|mac|linux/) ? 'mousemove' : 'touchmove';
					if (obj.touchevent == 'up')   obj.touchevent = UI.navi().match(/window|mac|linux/) ? 'mouseup' : 'touchend';
					var eventelem = obj.touchevent == 'mousemove' || obj.touchevent == 'mouseup' ? document : elem;
					eventelem.addEventListener(obj.touchevent, function(event) {
						te.fn(event, obj.done, elem);
					});
				} else {
					for (var x in obj.el) {
						if (!obj.el.hasOwnProperty(x)) return;
						var stopp = function(ev) {ev.stopPropagation()};
						obj.el[x].addEventListener('mousedown', stopp);
						obj.el[x].addEventListener('touchstart', stopp);
						obj.el[x].addEventListener('mousemove', stopp);
						obj.el[x].addEventListener('touchmove', stopp);
						obj.el[x].addEventListener('mouseup', stopp);
						obj.el[x].addEventListener('touchend', stopp);
					}
				}
			})(arguments[i]);
		}
	},

	// ajax
	getAjax: function(obj) {
	    obj.type  = obj.type  !== void 0 ? obj.type  : 'GET';
	    obj.async = obj.async !== void 0 ? obj.async : true;
	    var xml = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXOject('Microsoft.XMLHTTP');
	    
	    xml.onreadystatechange = function() {
	        if (xml.readyState == 4 && xml.status == 200) {
	            if (typeof obj.success != 'undefined') obj.success(JSON.parse(xml.responseText));
	        } 
	    }
	    xml.timeout = 0;//设置过期时间（毫秒）；0代表不限制
	    xml.open(obj.type, obj.url, obj.async);
	    xml.setRequestHeader('If-Modified-Since', '0');    // 必须放在open之后，send之前
	    xml.setRequestHeader('Cache-Control', '*');
	    xml.send();
	}
};


// 禁止某些元素触摸事件
(function() {
	for (var i = 0; i < arguments.length; i++) {
		var ele = document.querySelector(arguments[i]);
		if (ele != null) ele.addEventListener('touchmove', function(ev) {
			ev.preventDefault()
		});
	}
})('.page-backtop');


//引入文件  加参数
(function() {
	var link = document.getElementsByTagName('link')
	var script = document.getElementsByTagName('script')
	for (var i = 0; i < link.length; i++) {
		link[i].href = link[i].href + '?type=' + new Date().getTime()
	}
	for (var i = 0; i < script.length; i++) {
		script[i].src = script[i].src + '?type=' + new Date().getTime()
	}
}());


//自定义tap事件
Object.prototype.tap = function(cb) {
	UI.navi().match(/window|mac|linux/) ?
		(function(w) {
			w.onclick = function(ev) {
				cb.call(this,ev);
			}
		})(this) :
		(function(w) {
			var params = {};
			w.ontouchstart = function(ev) {
				params.time = new Date().getTime();
				params.x = ev.targetTouches[0].pageX;
				params.y = ev.targetTouches[0].pageY;
			}
			w.ontouchend = function(ev) {
				timer = new Date().getTime();
				if (ev.changedTouches[0].pageX == params.x &&
					ev.changedTouches[0].pageY == params.y &&
					new Date().getTime() - params.time < 200)  cb.call(this, ev);
			}
		})(this);
};

// 遍历函数
Object.prototype.each = function (cb) {
    for (var x in this) {
        if (!this.hasOwnProperty(x)) return;
        if (typeof cb == 'function') cb(this[x], x);
    }
}

// 数组 根据属性 排序
Array.prototype.sortparams = function(str){
	return this.sort(function(o, p){
		var a = o[str],
		    b = p[str];
		if (isNaN(a)) {  // 非数字排序
		    return a.localeCompare(b);  // 用本地特定顺序来比较(支持中文)
		} else {
		    if (a === b) return 0;
		    else return a > b ? 1 : -1;
		}
	})
}

//字符串转译
String.prototype.Escape = function() {
	var str = this;
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

//对象 深拷贝
Object.prototype.deepcopy = function(){
    var foreachobj = function(oldval, newval) {
        for (var x in oldval){
            if (!oldval.hasOwnProperty(x)) continue;
            if (typeof oldval[x] == 'object') {
                newval[x] = oldval[x] instanceof Array ? [] : {};
                foreachobj(oldval[x], newval[x]);
            } else {
                newval[x] = oldval[x];
            }
        }
    }
    var newobj = this instanceof Array ? [] : {};
    foreachobj(this, newobj);
    return newobj;
}




// dom渲染完成后 才进行操作
// document.onreadystatechange = function () {
// 	if (document.readyState == "complete") { 
	    
// 	}
// }


var wheel = function(e){
    var delta = (e.originalEvent.wheelDelta && (e.originalEvent.wheelDelta > 0 ? 1 : -1)) ||  // chrome & ie
                (e.originalEvent.detail && (e.originalEvent.detail > 0 ? -1 : 1));              // firefox
    if (delta > 0) {
        console.log("wheelup");
    } else if (delta < 0) {
        console.log("wheeldown");
    }
}
document.onmousewheel   = wheel;
document.DOMMouseScroll = wheel;