class Common {
    constructor() {

    }

    // 获取 是否移动设备
    device(str) {
        str = str || /android|phone|pad/;
        if (navigator.userAgent.toLowerCase().match(str)) return true;
        else return false;
    }

    // 截取地址栏
    cuturl(name) {
        let [url, theRequest] = [window.location.search, {}]; //获取url中"?"符后的字串
        if (url.indexOf("?") != -1) {
            strs = url.substr(1).split("&");
            for (let i = 0, len = strs.length; i < len; i++) {
                let [key, val] = strs[i].split("=");
                theRequest[key] = decodeURI(val);
            }
        }
        return name ? theRequest[name] : theRequest;
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
        let type, style, str, now = new Date(timeStamp);
        if (typeof argumentType == 'number')[type, style] = [argumentType, argumentStyle || '-'];
        else [type, style] = [0, typeof argumentType == 'undefined' ? '-' : argumentType];
        let [year, month, date, hour, minute, second] = [
            now.getFullYear(),
            ("0" + (now.getMonth() + 1)).match(/\d{2}$/)[0],
            ("0" + now.getDate()).match(/\d{2}$/)[0],
            ("0" + now.getHours()).match(/\d{2}$/)[0],
            ("0" + now.getMinutes()).match(/\d{2}$/)[0],
            ("0" + now.getSeconds()).match(/\d{2}$/)[0]
        ]
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

    // console.log(s)     购物车分类     转为  [1:1,4:1,8:2,9:1]  ...
    specInitFn(data) {
        let filterList = [];
        data.map(item => (!filterList[item.specId] ? filterList[item.specId] = [] : null, filterList[item.specId].push(item)));
        filterList = filterList.filter(item => item);
        let filterListLen = filterList.length, result = [], cutList = [];
        for (let i = 0; i < filterListLen; i++) cutList.push([]);
        forDataFn();
        function forDataFn(index = 0, newCutList = cutList) {
            let currDataLen = filterList[index].length
            for (let i = 0; i < currDataLen; i++) {
                newCutList[index] = filterList[index][i]
                if (index < filterListLen - 1) forDataFn(index + 1, newCutList);
                else {
                    let newCutListLen = newCutList.length - 1, obj = {specIds: '[', specNames: ''};
                    newCutList.map((item, itemIndex) => {
                        obj.specIds += `${item.specId}:${item.specValueId}`;
                        obj.specNames += `${item.specName}:${item.specValueName}`;
                        if (itemIndex < newCutListLen) obj.specIds += ',', obj.specNames += ',';
                        else obj.specIds += ']', result.push(obj);
                    });
                }
            }
        }
        return result;
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
    //              let bdata = new Common().cookies();
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

    // 瀑布流
    // ---------------------------------------------------样式部分
    // .wf-list{position: relative; margin: 0 auto;}
    // .wf-list li{
    //     position: absolute;
    //     transition: all .5s;
    //     overflow: hidden;
    // }
    // .wf-list li img{width: 100%; display: block}
    // .wf-list .wf-name{
    //     position: absolute;
    //     bottom: -60px; 
    //     left: 0;
    //     width: 100%;
    //     background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAyCAMAAACqJUG4AAAAYFBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD6T+iNAAAAIHRSTlMBpp+TiHdqUTEqIxwTDgmZjYJ9cGRgXFdLRkM/OzcYBpB7wwsAAAA8SURBVAjXRcHFAYMAAMDA0OLuLvtvSX7c8XmoXbn0TeHcmVNfnBzsbKwkXpiZGIk9ELmnI3TL3w0/BwQven8CWkDaUVAAAAAASUVORK5CYII=") repeat-x ;
    //     color: white;
    //     height: 50px;
    //     line-height: 55px;
    //     text-align: center;
    //     transition: bottom .3s;
    //     font-size: 14px; 
    // }
    // .wf-list li:hover .wf-name{bottom: 0; }
    // ---------------------------------------------------javascript调用部分
    // waterfall('.waterfall-container', {
    //     data: ajaxdata,
    //     // outerWidth: 1200,  // outer的宽度   手机自动适配屏幕宽度  不要传   
    //     // nums: 2,           // 一行的数量
    //     // space: 6,          // 图片之间的间隔
    //     done: function(elem) {
    //         console.log(elem)
    //     }
    // })
    waterfall(elem, objective) {
        let timer = null;
        const _self = this;
        const outer = document.querySelector(elem);
        const bodyClientWidth = document.documentElement.clientWidth;
        let needNums, needSpace, needOuterWidth;
        if (bodyClientWidth > 1280)[needNums, needSpace, needOuterWidth] = [5, 10, 1200];
        if (bodyClientWidth <= 1280 && bodyClientWidth > 1024)[needNums, needSpace, needOuterWidth] = [4, 10, 1024];
        if (bodyClientWidth <= 1024 && bodyClientWidth > 640)[needNums, needSpace, needOuterWidth] = [3, 6, bodyClientWidth];
        if (bodyClientWidth <= 640)[needNums, needSpace, needOuterWidth] = [2, 4, bodyClientWidth];
        const {
            data,
            outerWidth = needOuterWidth, // outer的宽度   手机自动适配屏幕宽度  不要传   
            nums = needNums, // 一行的数量
            space = needSpace // 图片之间的间隔
        } = objective;
        [needNums, needSpace, needOuterWidth] = [null, null, null];
        const everyWidth = (outerWidth - space * (nums - 1)) / nums;

        const dataLen = data.length;
        let computedImgOnloadNums = 0;
        data.forEach(item => {
            let img = new Image();
            img.src = item.image;
            img.onload = function() {
                computedImgOnloadNums++;
                item.width = everyWidth;
                item.height = Math.floor(item.width / this.width * this.height);
                if (computedImgOnloadNums == dataLen) positionFn(data);
            }
        });



        // 获取   top  left
        function positionFn(posData) {
            let lineArr = []; // 一竖每个元素的高度 累加
            posData.forEach((item, index) => {
                if (index < nums) {
                    lineArr.push(item.height);
                    item.left = index ? (everyWidth + space) * index : 0;
                    item.top = 0;
                } else {
                    let {
                        minHeightIndex,
                        minTop
                    } = getMaxMinHeightFn(lineArr);
                    lineArr[minHeightIndex] += item.height + space;
                    item.left = minHeightIndex ? (everyWidth + space) * minHeightIndex : 0;
                    item.top = minTop + space
                }

            });
            !outer.innerHTML ? createElemFn(lineArr) : resizePosFn(lineArr, posData);
        }



        // 生成dom
        function createElemFn(lineArr) {
            let str = `<ul class="wf-list" style="width: ${outerWidth}px; height: ${getMaxMinHeightFn(lineArr, true)}px">`;
            data.forEach(item => {
                str += `<li style="width: ${item.width}px; height: ${item.height}px; top: ${item.top}px; left: ${item.left}px">
                            <div class="wf-image"><img src="${item.image}" /></div>
                            <div class="wf-name">${item.name}</div>
                        </li>`
            });
            str += '</ul>';
            outer.innerHTML = str;
            if (typeof objective.done == 'function') objective.done(outer.querySelector('.wf-list'));
        }


        // window.onresize
        function resizePosFn(lineArr, posData) {
            const wful = outer.querySelector('.wf-list');
            wful.style.width = outerWidth + 'px';
            wful.style.height = getMaxMinHeightFn(lineArr, true) + 'px';
            let wfList = wful.querySelectorAll('li');
            posData.forEach((item, index) => {
                wfList[index].style.width = item.width + 'px';
                wfList[index].style.height = item.height + 'px';
                wfList[index].style.top = item.top + 'px';
                wfList[index].style.left = item.left + 'px';
            })
        }



        // type == false  获取 最小高度和当前索引        type==true  直接要最后的最大高度
        function getMaxMinHeightFn(arr, type) {
            let [minTop, lastMaxHieght, minHeightIndex] = [10000, 0, null];
            arr.forEach((item, i) => {
                if (minTop > item) minTop = item, minHeightIndex = i;
                if (lastMaxHieght < item) lastMaxHieght = item;
            })
            return !type ? {
                minHeightIndex,
                minTop
            } : lastMaxHieght;
        }


        function windowEventFn() {
            clearTimeout(timer);
            timer = setTimeout(() => {
                _self.waterfall(elem, {
                    data: objective.data
                })
                window.removeEventListener('resize', windowEventFn);
            }, 200);
        }
        window.addEventListener('resize', windowEventFn)
    }

    getVerification(elem) {  // 直接传入elem  #canva
        let show_num = [];
        const canvas = document.getElementById(elem);
        const [elemWidth, elemHeight, context] = [canvas.clientWidth, canvas.clientHeight, canvas.getContext("2d")];

        canvas.width = elemWidth;
        canvas.height = elemHeight;
        const sCode = "A,B,C,E,F,G,H,J,K,L,M,N,P,Q,R,S,T,W,X,Y,Z,1,2,3,4,5,6,7,8,9,0";
        const aCode = sCode.split(",");
        const aLength = aCode.length; //获取到数组的长度

        for (let i = 0; i <= 3; i++) {
            let j = Math.floor(Math.random() * aLength); //获取到随机的索引值
            let deg = Math.random() * 30 * Math.PI / 180; //产生0~30之间的随机弧度
            let txt = aCode[j]; //得到随机的一个内容
            show_num[i] = txt.toLowerCase();
            let x = 10 + i * 20; //文字在canvas上的x坐标
            let y = 20 + Math.random() * 8; //文字在canvas上的y坐标
            context.font = "bold 23px 微软雅黑";

            context.translate(x, y);
            context.rotate(deg);

            context.fillStyle = randomColor();
            context.fillText(txt, 0, 0);

            context.rotate(-deg);
            context.translate(-x, -y);
        }
        for (let i = 0; i <= 5; i++) { //验证码上显示线条
            context.strokeStyle = randomColor();
            context.beginPath();
            context.moveTo(Math.random() * elemWidth, Math.random() * elemHeight);
            context.lineTo(Math.random() * elemWidth, Math.random() * elemHeight);
            context.stroke();
        }
        for (let i = 0; i <= 30; i++) { //验证码上显示小点
            context.strokeStyle = randomColor();
            context.beginPath();
            let x = Math.random() * elemWidth;
            let y = Math.random() * elemHeight;
            context.moveTo(x, y);
            context.lineTo(x + 1, y + 1);
            context.stroke();
        }


        function randomColor() { //得到随机的颜色值
            const [r, g, b] = [Math.floor(Math.random() * 222), Math.floor(Math.random() * 256), Math.floor(Math.random() * 256)];
            return "rgb(" + r + "," + g + "," + b + ")";
        }

        return show_num
    }


    getField(arr, field, compareVal) {
        let obj = {};
        arr.map(item => item[field] == compareVal ? obj = item : null);
        return obj;
    }

    isSafetyPwd(text) {
        return /^(\w){6,20}$/.test(text) ? true : false;
    }

    hidePhone(text) {
        if (typeof text != 'string') return;
        return text.replace(/(\d{3})(\d{4})(\d{4})/, '$1****$3');
    }

    randomName() {
        let result = 'SM',
            arr = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'z', 'x', 'c', 'v', 'b', 'n', 'm'];
        let len = arr.length
        for (let i = 0; i < 10; i++) {
            let random = arr[parseInt(Math.random() * len)];
            if (parseInt(Math.random() * len) % 2) random = random.toLocaleUpperCase();
            result += random
        }
        return result;
    }


    // 数字 每位数字肚子增加 
    // ---------------------------------------------------样式部分
    // .outer{width: 100vw; height: 100vh; font-size: 40px;}
    // .TotalNum{overflow: hidden;}
    // .currNum, .everyNum{width: 24px; height: 40px; }
    // .everyNum{ transition: transform 2s;}
    // 
    // 数字递增调用 countNum(document.querySelector('.outer'), 124907)
    countNum(elem, val) {
        let valToArr = val.toString().split('');
        let everyNumsStr = valToArr.map(item => {
            let str = `<div class="everyNum" selfVal=${item}>`
            for (let i = 0; i < 20; i++) str += `<div class="currNum center">${i > 9 ? i - 10 : i}</div>`;
            str += `</div>`
            return str
        }).join('');
        elem.innerHTML = `<div class="TotalNum start">${everyNumsStr}</div>`;
        setTimeout(() => Array.from(elem.querySelectorAll('.everyNum')).map(item => {
            item.style.transform = `translateY(-${(Number(item.getAttribute('selfval')) + 10) * 40}px)`
        }), 100)
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
//     xml.setRequestHeader('Content-Type', 'application/json');    // 必须放在open之后，send之前
//     xml.setRequestHeader('If-Modified-Since', '0');    // 必须放在open之后，send之前
//     xml.send(JSON.stringify(data));

// }
// 
// 
// function jsonp(url, data, callback) {
//     var dataString = url.indexOf('?') == -1 ? '?' : '&';
//     for (var key in data) {
//         dataString += key + '=' + data[key] + '&';
//     };
//     var cbFuncName = 'my_json_cb_' + Math.random().toString().replace('.', '');
//     dataString += 'callback=' + cbFuncName;
//     var scriptEle = document.createElement('script');
//     scriptEle.src = url + dataString;
//     window[cbFuncName] = function(data) {
//         callback(data.result);
//         document.body.removeChild(scriptEle);
//     }
//     document.body.appendChild(scriptEle);
// }



// dom渲染完成后 才进行操作
// document.onreadystatechange = function () {
//     if (document.readyState == "complete") { 
//          console.log("complete")  
//     }
// }
// 
// 




// let wh = window.innerHeight;
// window.onscroll = (e) => {
//     let st = document.body.scrollTop || document.documentElement.scrollTop
//     console.log(wh, st)
// }
// 
// 
// 
// 
// 
// 
// if (!Object.assign) {
//     Object.defineProperty(Object, 'assign', {
//         enumerable: false,
//         configurable: true,
//         writable: true,
//         value: function(target) {
//             if (target === undefined || target === null) throw new TypeError('Cannot convert first argument to object');
//             var to = Object(target);
//             for (var i = 1; i < arguments.length; i++) {
//                 var nextSource = arguments[i];
//                 if (nextSource === undefined || nextSource === null) continue;
//                 nextSource = Object(nextSource);
//                 var keysArray = Object.keys(nextSource);
//                 for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
//                     var nextKey = keysArray[nextIndex];
//                     var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
//                     if (desc !== undefined && desc.enumerable) to[nextKey] = nextSource[nextKey];
//                 }
//             }
//             return to;
//         }
//     });
// }