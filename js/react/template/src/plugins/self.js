export default {
	$pageSize: 10,
	$pageNo: 1,
	
	$escape(str) {
		str = str.replace(/&/g, '&amp;');
		str = str.replace(/</g, '&lt;');
		str = str.replace(/>/g, '&gt;');
		str = str.replace(/'/g, '&acute;');
		str = str.replace(/"/g, '&quot;');
		str = str.replace(/\|/g, '&brvbar;');
		str = str.replace(/[\n\r]/g, '<br>');
		str = str.replace(/\s/g, '&nbsp;');
		return str;
	},

	$ftime(timeStamp, argumentType, argumentStyle) {
		if (typeof timeStamp != 'number') return;
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
		if (type === 0 || type > 3) str = year + style + month + style + date + ' ' + hour + ':' + minute + ':' + second;
		if (type === 1) str = year + style + month;
		if (type === 2) str = year + style + month + style + date;
		if (type === 3) str = hour + ':' + minute + ':' + second;
		now = year = month = date = hour = minute = second = type = style = null;
		return str;
	},

	$sort(array, string) {
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
	},

	$imgLoad(url, callback) {
		let img = new Image();
		img.src = url;
		img.onload = function() {
			callback(this.width > this.height);
		}
	},

	$simpleTransCoding() {
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
				c2 = 0,
				c3;
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
	},


	$storage() { // 需要运行在服务器
		const baseCode = this.$simpleTransCoding();
		return {
			add(params) { // 添加/修改
				let d = new Date();
				d.setTime(d.getTime() + (24 * 60 * 60 * 1000));
				let expires = "expires=" + d.toGMTString();
				for (let x in params) {
					if (!params.hasOwnProperty(x)) continue;
					let currVal = baseCode.encode(params[x].toString());
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
			del(key) { // 删除
				document.cookie = key + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT';
			},
			remove() { // 删除全部
				let cookArr = document.cookie.split(/;\s?/g),
					cookArrLen = cookArr.length;
				for (let i = 0; i < cookArrLen; i++) {
					let arr1 = cookArr[i].split(/=/);
					let key = arr1[0];
					document.cookie = key + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT';
				}
			}
		}
	},

	$getField(arr, field, compareVal) {
		let obj = {};
		arr.map(item => item[field] == compareVal ? obj = item : null);
		return obj;
	},




	$getVerification(elem) {  // 直接传入elem  #canva
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
	},

	$isPhone(text) {
		return /^[1][3,4,5,7,8][0-9]{9}$/.test(text) ? true : false;
	},

	$isSafetyPwd(text) {
		return /^(\w){6,20}$/.test(text) ? true : false;
	},

	$hidePhone(text) {
		if (typeof text != 'string') return;
		return text.replace(/(\d{3})(\d{4})(\d{4})/, '$1****$3');
	},


	$randomName() {
		let result = 'SM',
			arr = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'z', 'x', 'c', 'v', 'b', 'n', 'm'];
		let len = arr.length
		for (let i = 0; i < 10; i++) {
			let random = arr[parseInt(Math.random() * len)];
			if (parseInt(Math.random() * len) % 2) random = random.toLocaleUpperCase();
			result += random
		}
		return result;
	},
}


