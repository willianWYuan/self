import axios from 'axios'

let $axios = async (url, params) => {
	let {data} = await axios.post(`https://rrb8.cn${url}`, params)
	console.log(data)
	return data;
}

export default $axios
