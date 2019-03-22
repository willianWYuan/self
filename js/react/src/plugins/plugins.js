import Self from './self'


export default {
	...Self,
	$cookie: Self.$storage(),
	$ajax(url, params, callback) {
		// package.json   设置"proxy": "http://sm888vip.com"
		fetch(url, {
			method: "post",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(params)
		}).then(res => res.json()).then(data => typeof callback == 'function' ? callback(data) : null).catch(e => console.log("fetch fail", e));
	}
}

