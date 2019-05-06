import Child from '@pages/Child'
import App from '@layout/_app'
import _axios from '@plugin/index.js'



const Index = (props) => {
    console.log(props)
    return <App>
        <Child {...props} ></Child>
    </App>
}



Index.getInitialProps = async (params) => {
	let data = await _axios('/api/new/searchList.json', {newType: 1})  
	return {name: 'app', arr: [6,235,64,83,93], data}
}

export default Index

