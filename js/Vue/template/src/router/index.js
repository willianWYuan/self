import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'


import A from '@/page/components_local/A'

import C from '@/page/router/C'
import D from '@/page/router/D'
import childA from '@/page/router/child/childA'
import childB from '@/page/router/child/childB'

import F from '@/page/vuex/F'

import P from '@/page/fetch/P'
import MintUI from '@/page/MintUI/MintUI'
import ElementUI from '@/page/ElementUI/ElementUI'
// const ElementUI = resolve => require(['../page/ElementUI/ElementUI.vue'], resolve)

Vue.use(Router)



const route = new Router({
	// mode: 'history',
	routes: [{
		path: '/',
		redirect: '/ElementUI',
		component: HelloWorld
	}, {
		path: '/A',
		component: A
	}, {
		path: '/C/:userId/:keys',
		name: C,
		component: C,
		meta: {
			title: "我是首页"
		}
	}, {
		path: '/D',
		component: D,
		children: [{
			path: 'child',
			components: {
				default: childA,
				a: childB
			},
		}],
		alias: '/E'
	}, {
		path: '/F',
		component: F
	}, {
		path: '/P',
		component: P
	}, {
		path: '/MintUI',
		component: MintUI
	}, {
		path: '/ElementUI',
		component: ElementUI
	}],



	scrollBehavior(to, from, savedPosition) { // 切换路由   回到页面顶部
		if (savedPosition) {
			return savedPosition
		} else {
			return {
				x: 0,
				y: 0
			}
		}
	}
})



// route.beforeEach((to, from, next) => {
//   console.log('beforeEach',to, from)
//   next()
// })

// route.beforeResolve((to, from, next) => {
//   console.log('beforeResolve',to, from, next)
//   next()
// })

// route.afterEach((to, from) => {
// 	console.log(to, from)
// })



var routesArr = [{
	path: '/user/:userId',
	name: 'user',
	component: HelloWorld, // import HelloWorld from 'HelloWorld'
	children: [],
	components: {
		default: childA, // <router-link></router-link>
		a: childA, // <router-link name="a"></router-link>
		b: childB // <router-link name="b"></router-link>
	},
	redirect: '/D', // 直接跳进/D指定的页面,
	alias: '/E', // 地址栏   /user/2  与  /E/2  指向同一页面
	meta: {
		title: "我是首页"
	}
}]



export default route