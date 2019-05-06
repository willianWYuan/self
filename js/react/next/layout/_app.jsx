import React, { Fragment } from 'react'
import Head from 'next/head'

const color = '#fff'

const _app = ({children}) => <Fragment>
    <Head>
    	<title>My page title</title>
    	<meta name="viewport" content="initial-scale=1.0, width=device-width" />
    	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <link rel="stylesheet" href="/static/style.css?v=0.0.1" />
    </Head>
    <Fragment>
        { children } color={color}
    </Fragment>
</Fragment>


export default _app

