import React, { Fragment } from 'react'
import Head from 'next/head'
import '@modules/antd/lib/date-picker/style/css';
import '@component/style.css'
import { LocaleProvider } from 'antd';
import zh_CN from '@modules/antd/lib/locale-provider/zh_CN';
import en_US from '@modules/antd/lib/locale-provider/en_US';


const _app = ({children, title = "next.js", isloading}) => ( 
<Fragment>
    <Head>
    	<title>{title}</title>
    	<meta name="viewport" content="initial-scale=1.0, width=device-width" />
    	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
    </Head>
    <LocaleProvider locale={zh_CN}>
        <Fragment>
            { children }
            {isloading ? <div className="loading">loading...</div> : ''}
        </Fragment>
    </LocaleProvider>
    <style jsx>{`
        .loading{position: fixed; top: 0; left: 0; right: 0; bottom: 0; display: flex; justify-content: center; align-items: center; z-index: 10}
    `}</style>
</Fragment>
)

export default _app

