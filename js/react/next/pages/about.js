import Router, { withRouter } from 'next/router'



const about = props => {
	let {back, pathname, query, push, beforePopState} = props.router;
	// console.log(Router, query)

	function componentDidUpdate() {
		console.log('componentDidUpdate')
	}


	const handleRouteChange = url => {
	  console.log('App is changing to: ', url)
	  Router.events.off('routeChangeStart', handleRouteChange)
	}
	// Router.events.on('hashChangeStart', handleRouteChange)
	Router.events.on('routeChangeStart', handleRouteChange)

	return <p onClick={ev => push("/?id=2")}>Welcome to {pathname}!</p>
}


export default withRouter(about)