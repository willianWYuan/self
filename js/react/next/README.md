## install

npm install --save next react react-dom

新建 ./pages/index.js 到你的项目中:



## CSS

<style global jsx>{``}</style>


## 静态文件服务    /static


## HEAD

import Head from 'next/head';

<Head>
	<title>My page title</title>
	<meta name="viewport" content="initial-scale=1.0, width=device-width" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
</Head>




## getInitialProps

服务器渲染钩子



## router

import { withRouter } from 'next/router'   // 不能直接使用props的url;    注入pathname, query 或 asPath;   withRouter(组件名)
let {back, pathname, query, push, beforePopState} = props.router;
push("/about?name=join&userId=2")

import Link from 'next/link'
<Link prefetch replace scroll={false} href={"/about?name=join&userId=2"}><a>{item}</a></Link>

