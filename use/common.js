class Common {
    constructor(host = '127.0.0.1') {
        this.host = '127.0.0.1';
    }



    log(str) {
        console.log(str)
    }


    // 获取 是否移动设备
    device(str) {
        str = str || /android|phone|pad/;
        if (navigator.userAgent.toLowerCase().match(str)) return true;
        else return false;
    }

    // 截取地址栏
    cuturl(argumentStr) {
        let href = location.href.split('?')[1];
        if (!href) return;
        href = href.split(/&+/g);
        let newObj = {};
        for (let i = 0; i < href.length; i++) {
            newObj[href[i].split('=')[0]] = href[i].split('=')[1]
        }
        return typeof argumentStr == 'undefined' ? newObj : newObj[argumentStr];
    }


    getstyle(elem, type) { // getstyle(elem, 'font-size')
        let style = elem.currentStyle ? elem.currentStyle[type] : window.getComputedStyle(elem, null)[type];
        return style;
    }


    // 转 Escape
    escape(str) {
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
    // formattime(时间戳)     
    //          argumentType  [Number] == 1,  
    //          argumentStyle [String] == '/',  
    formattime(timeStamp, argumentType, argumentStyle) {
        let type, style;
        if (typeof argumentType == 'number') {
            type = argumentType;
            style = argumentStyle || '-';
        } else {
            type = 0;
            style = typeof argumentType == 'undefined' ? '-' : argumentType;
        }
        let now = new Date(timeStamp);
        let year = now.getFullYear();
        let month = ("0" + (now.getMonth() + 1)).match(/\d{2}$/)[0];
        let date = ("0" + now.getDate()).match(/\d{2}$/)[0];
        let hour = ("0" + now.getHours()).match(/\d{2}$/)[0];
        let minute = ("0" + now.getMinutes()).match(/\d{2}$/)[0];
        let second = ("0" + now.getSeconds()).match(/\d{2}$/)[0];
        let str;
        if (type == 0 || type > 3) str = year + style + month + style + date + ' ' + hour + ':' + minute + ':' + second;
        if (type == 1) str = year + style + month;
        if (type == 2) str = year + style + month + style + date;
        if (type == 3) str = hour + ':' + minute + ':' + second;
        now = year = month = date = hour = minute = second = type = style = null;
        return str;
    }


    // 倒计时  根据终点时间 倒计                   site.countdown(elem, (new Date('2018-09-02 15:46').getTime() - new Date().getTime()) / 1000)
    countdown(elem, timeStamp, callback) { // timeStamp 剩余多少秒(后台传过来)
        let timer, str, date, seconds, mintes, hours, timeFn = function() {
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

    // 遍历函数                                             site.each(arr, function(item){ site.log(item) })
    each(obj, callback) {
        for (let x in obj) {
            if (!obj.hasOwnProperty(x)) continue;
            if (typeof callback == 'function') callback(obj[x], x);
        }
    }

    // 数组 根据属性 排序                         let newarr = site.sort(arr, '字段名')
    sort(array, string) {
        return array.sort(function(o, p) {
            let a = o[string],
                b = p[string];
            if (isNaN(a)) { // 非数字排序
                return a.localeCompare(b); // 用本地特定顺序来比较(支持中文)
            } else {
                if (a === b) return 0;
                else return a > b ? 1 : -1;
            }
        })
    }



    // 对象 深拷贝                                 let newarr2 = site.deepcopy(arr)
    deepcopy(object) {
        let dcfn = function(oldval, newval) {
            for (let x in oldval) {
                if (!oldval.hasOwnProperty(x)) continue;
                if (typeof oldval[x] == 'object') {
                    newval[x] = oldval[x] instanceof Array ? [] : {};
                    dcfn(oldval[x], newval[x]);
                } else {
                    newval[x] = oldval[x];
                }
            }
        }
        let newobj = object instanceof Array ? [] : {};
        dcfn(object, newobj);
        return newobj;
    }



    // 鼠标滚轮 滚动                     site.wheel(function(){root.innerText = "wheelup"}, function(){root.innerText = "wheeldown"})
    wheel(callbackwheelup, callbackwheeldown) {
        let fn = function(e) {
            let delta = (e.wheelDelta && (e.wheelDelta > 0 ? 1 : -1)) || // chrome & ie
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
    lazy(elem) {
        let getElemOffset = function(imgElem) {
            let top = imgElem.offsetTop;
            let paEle = imgElem.offsetParent; //当前ele的父元素
            while (paEle) {
                top += paEle.offsetTop;
                paEle = paEle.offsetParent;
            }
            return top;
        };
        let lazyScroll = function() {
            let lazyArr = [],
                lazyElem = document.getElementsByTagName('img');
            let lazyElemLength = lazyElem.length;
            for (let i = 0; i < lazyElemLength; i++) {
                if (!lazyElem[i].getAttribute('site-src')) continue;
                lazyArr.push(lazyElem[i]);
            }
            let st = elem.scrollTop;
            let ch = elem.clientHeight;
            for (let i = 0; i < lazyArr.length; i++) {
                let lazyTop = getElemOffset(lazyArr[i]);
                if (lazyTop <= st + ch / 10 * 11) {
                    let newSrc = lazyArr[i].getAttribute('site-src');
                    lazyArr[i].setAttribute('src', newSrc);
                    lazyArr[i].removeAttribute('site-src');
                }
            }
        };
        lazyScroll();
        window.onscroll = lazyScroll
    }


    // 添加标签                              site.tag('vue.js');
    tag(url, isBefore) {
        let newTag, isType = url.match(/\.js$/);
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
        let headElem = document.getElementsByTagName('head')[0];
        if (isBefore) headElem.insertBefore(newTag, headElem.childNodes[0]);
        else headElem.appendChild(newTag);
    }



    // 回到头部                     site.backtop(elem);
    backtop(elem, speed = 1000) {
        let currtop = elem.scrollTop;
        let pscrtime = setInterval(function() {
            currtop -= currtop / speed * 200;
            elem.scrollTop = currtop;
            if (Math.floor(currtop) <= 8) {
                clearInterval(pscrtime);
                elem.scrollTop = 0;
            }
        }, 15);
    }



    // imgOnload
    imgOnload(url, callback) {
        let img = new Image();
        img.src = url;
        img.onload = function() {
            callback(this.width > this.height, url);
        }
    }



    base64Image(obj, callback) { // 根据width height      截取图片中间的部分
        let image = new Image();
        image.src = obj.url;
        let paramsWidth = obj.width || 500;
        let paramsHeight = obj.height || 500;
        // image.crossOrigin = 'anonymous';
        image.onload = function() {
            let canvas = document.createElement("canvas");
            canvas.width = paramsWidth;
            canvas.height = paramsHeight;

            let compressWidth, compressHeight, compressTop = 0,
                compressLeft = 0;
            if (this.width > this.height) {
                compressWidth = this.width / this.height * paramsHeight;
                compressHeight = paramsHeight
                compressLeft = (paramsWidth - compressWidth) / 2;
            } else {
                compressHeight = this.height / this.width * paramsWidth;
                compressWidth = paramsWidth
                compressTop = (paramsHeight - compressHeight) / 2;
            }

            let ctx = canvas.getContext("2d");
            ctx.drawImage(this, compressLeft, compressTop, compressWidth, compressHeight);
            // let ext = this.src.substring(this.src.lastIndexOf(".") + 1).toLowerCase();
            let dataURL = canvas.toDataURL('image/jpeg', 1.0);
            callback(dataURL)
        }
    }



    // let s = site.specInitFn([
    //  { specId: 1, specName: '尺寸', specValueId: 1, specValueName: 'L码' },
    //  { specId: 1, specName: '尺寸', specValueId: 3, specValueName: 'M码' },
    //  { specId: 1, specName: '尺寸', specValueId: 5, specValueName: 'S码' },
    //  { specId: 1, specName: '尺寸', specValueId: 7, specValueName: 'XS码' },
    //  { specId: 1, specName: '尺寸', specValueId: 8, specValueName: 'XL码' },
    //  { specId: 4, specName: '颜色', specValueId: 1, specValueName: '黑色' },
    //  { specId: 4, specName: '颜色', specValueId: 7, specValueName: '红色' },
    //  { specId: 4, specName: '颜色', specValueId: 9, specValueName: '蓝色' },
    //  { specId: 4, specName: '颜色', specValueId: 11, specValueName: '白色' },
    //  { specId: 4, specName: '颜色', specValueId: 25, specValueName: '紫色' },
    //  { specId: 8, specName: '版本', specValueId: 2, specValueName: '豪华版' },
    //  { specId: 8, specName: '版本', specValueId: 3, specValueName: '精致版' },
    //  { specId: 8, specName: '版本', specValueId: 5, specValueName: '经济版' },
    //  { specId: 9, specName: '库存', specValueId: 1, specValueName: '有' },
    //  { specId: 9, specName: '库存', specValueId: 2, specValueName: '否' },
    // ])

    // console.log(s)     购物车分类     转为  [1:2, 2:3, 4:8]
    specInitFn(arr) {
        let filterArr = [],
            classArr = [],
            classLen, newArr = [];
        // 分类
        arr.forEach(function(item) {
            if (!filterArr[item.specId]) filterArr[item.specId] = [];
            filterArr[item.specId].push(item);
        })
        // 过滤
        filterArr.forEach(function(item) {
            if (item) classArr.push(item);
        })
        // 生成嵌套数组
        classLen = classArr.length;
        for (let i = 0; i < classLen; i++) {
            classArr[i].forEach(function(item) {
                item.children = classArr[i + 1];
            })
        }
        forResultFn(classArr[0], {});
        // 生成需要的数组
        function forResultFn(itemArr, obj) {
            let specIdsStr = obj.specIds ? obj.specIds : '';
            let specNamesStr = obj.specNames ? obj.specNames : '';
            itemArr.forEach(function(item) {
                obj.specIds = obj.specIds ?
                    specIdsStr + item.specId + ':' + item.specValueId + ',' :
                    item.specId + ':' + item.specValueId + ',';
                obj.specNames = obj.specNames ?
                    specNamesStr + item.specName + ':' + item.specValueName + ',' :
                    item.specName + ':' + item.specValueName + ',';
                if (item.children) {
                    forResultFn(item.children, obj);
                } else {
                    let arrObj = {}
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
    // let str = '123456';  
    // let base = Common().simpleTransCoding();  
    // let result = base.encode(str);  
    // console.log(result);  

    // //2.解密  
    // let result2 = base.decode(result);  
    // console.log(result2)

    // 简单转码处理
    simpleTransCoding() {
        let _utf8_encode, _utf8_decode;
        const _keyStr = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=`;
        const resultObject = {
            encode(input) {
                let output = "";
                let chr1, chr2, chr3, enc1, enc2, enc3, enc4;
                let i = 0;
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
            },
            decode(input) {
                let output = "";
                let chr1, chr2, chr3;
                let enc1, enc2, enc3, enc4;
                let i = 0;
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
        }
        _utf8_encode = function(string) {
            string = string.replace(/\r\n/g, "\n");
            let utftext = "";
            for (let n = 0; n < string.length; n++) {
                let c = string.charCodeAt(n);
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
            let string = "";
            let i = 0,
                c = 0,
                c1 = 0,
                c2 = 0;
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
        return resultObject;
    }



    // 获取 对应的父节点        let currElem = parentsFn(ev.target, 'className');
    parentNodeFn(elem, findName) {
        let result;

        function subParentsFn(subElem) {
            if (!subElem) return;
            if (subElem.className != findName) subParentsFn(subElem.parentNode);
            else result = subElem;
        }
        subParentsFn(elem);
        return result;
    }



    // cookie 浏览器存储
    //              let bdata = new Common().BrowserData();
    //              bdata.add({username: 'John', userId: 12, token: '5446iph57iaw234g33453h8235'})     添加或修改
    //              bdata.get() 获取整个对象          bdata.get('user')  获取user值
    //              bdata.del('user')  删除user值
    cookies() { // 需要运行在服务器
        const baseCode = this.simpleTransCoding();
        return {
            add(argumentObj) { // 添加/修改
                let d = new Date();
                d.setTime(d.getTime() + (24 * 60 * 60 * 1000));
                let expires = "expires=" + d.toGMTString();
                for (let x in argumentObj) {
                    if (!argumentObj.hasOwnProperty(x)) continue;
                    let currVal = baseCode.encode(argumentObj[x].toString());
                    document.cookie = x + '=' + currVal + "; " + expires;
                }
            },
            get(params) { // 获取
                let obj = {},
                    cookArr = document.cookie.split(/;\s?/g),
                    cookArrLen = cookArr.length;
                for (let i = 0; i < cookArrLen; i++) {
                    let indexPosition = cookArr[i].indexOf('=');
                    let k1 = cookArr[i].substring(0, indexPosition);
                    let v2 = cookArr[i].substring(indexPosition + 1, cookArr[i].length);
                    if (k1) obj[k1] = baseCode.decode(v2);
                }
                return params ? obj[params] : obj;
            },
            del(keys) { // 删除
                document.cookie = keys + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT';
            },
            remove() { // 删除全部
                let cookArr = document.cookie.split(/;\s?/g),
                    cookArrLen = cookArr.length;
                for (let i = 0; i < cookArrLen; i++) {
                    let arr1 = cookArr[i].split(/=/);
                    let keys = arr1[0];
                    document.cookie = keys + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT';
                }
            }
        }
    }
}

// getAjax: function(obj) {
//     obj.type  = obj.type  !== void 0 ? obj.type  : 'GET';
//     obj.async = obj.async !== void 0 ? obj.async : true;
//     let xml = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXOject('Microsoft.XMLHTTP');
//     xml.onreadystatechange = function() {
//         if (xml.readyState == 4 && xml.status == 200) {
//             if (obj.success) obj.success(JSON.parse(xml.responseText));
//         } 
//     }
//     xml.timeout = 0;//设置过期时间（毫秒）；0代表不限制
//     xml.open(obj.type, obj.url, obj.async);
//     xml.setRequestHeader('If-Modified-Since', '0');    // 必须放在open之后，send之前
//     xml.send(JSON.stringify(data));

// }



// dom渲染完成后 才进行操作
// document.onreadystatechange = function () {
//     if (document.readyState == "complete") { 
//          console.log("complete")  
//     }
// }