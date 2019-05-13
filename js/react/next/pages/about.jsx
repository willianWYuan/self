import { Router, withRouter, domain, Layout, _isPhone } from '@component/plugin'



const about = props => {
	let {back, pathname, query, push, beforePopState} = props.router;

	// const handleRouteChange = url => {
	//   console.log('App is changing to: ', url) 
	//   Router.events.off('routeChangeComplete', handleRouteChange)
	// }
	// Router.events.on('routeChangeComplete', handleRouteChange)



	return <Layout>
		
			<p onClick={ev => push("/?id=2")}>欢迎 {pathname}!</p>
			<p onClick={ev => push("/text")}>text</p>

	</Layout>
}


export default withRouter(about)