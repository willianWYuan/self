import axios from 'axios'

let fn = function(){};


fn.prototype.axios = (url, json, callback) => {
	axios.get(url, {
		params: json
	}).then(({data}) => {
		if (typeof callback == 'function') callback(data);
	}).catch(err => {
		console.log('err', err)
	})
}



export default new fn();