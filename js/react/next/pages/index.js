import React from 'react'

import Head from 'next/head'
import Child from './Child'

const Index = (props) => <div className="page">
    <Head>
    	<title>My page title</title>
    	<meta name="viewport" content="initial-scale=1.0, width=device-width" />
    	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
    </Head>
    <Child {...props} ></Child>
</div>

Index.getInitialProps = async (params) => {
	// console.log(params)
	return {name: 'app', list: [6,235,64,83,93]}
}

export default Index

