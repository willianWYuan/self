import { axios, withRouter, domain, Layout, _isPhone } from '@component/plugin'
import Child from '@pages/Child'
import fetch from 'isomorphic-unfetch'

const Index = (props) => {
    console.log(props)

    return <Layout>
        <Child {...props} ></Child>
        <div className="flex example">example</div>
    </Layout>
}



Index.getInitialProps = async (params) => {
    let {data} = await axios.post(`${domain}/api/new/searchList.json`, {newType: 1})  
    // const res = await fetch(`${domain}/api/new/searchList.json`, {
    //     method: 'POST',
    //     mode: 'cors',
    //     credentials: 'include',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //         newType: 1
    //     })
    // })
    // const data = await res.json()
	let { address } = await fetch(`http://127.0.0.1:9000/address.json`, {})  
	return {name: 'app', arr: [6,235,64,83,93], data}
}

export default withRouter(Index)

