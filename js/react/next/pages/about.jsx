import Router, { withRouter } from 'next/router'
import App, {Container} from 'next/app'


const about = props => {
	let {back, pathname, query, push, beforePopState} = props.router;

	// const handleRouteChange = url => {
	//   console.log('App is changing to: ', url) 
	//   Router.events.off('routeChangeComplete', handleRouteChange)
	// }
	// Router.events.on('routeChangeComplete', handleRouteChange)



	return <Container>
		<p onClick={ev => push("/?id=2")}>Welcome to {pathname}!</p>
		<p onClick={ev => push("/text")}>text</p>
	</Container>
}


export default withRouter(about)