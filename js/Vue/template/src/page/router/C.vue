<template>
	<div>
		<h1>{{ name }}</h1>
		<c-sub1></c-sub1>
		
	</div>
</template>


<script>
import CSub1 from './C_sub1'

export default {
	components: {
		CSub1
	},
	data() {
		return {
			name: 'C'
		}
	},
	

	// beforeRouteEnter(to, from, next) {
	// 	console.log('进入enter路由钩子')
	// 	console.log(to)
	// 	next()
	// },
	// beforeRouteLeave(to, from, next) {
	// 	console.log('进入leave路由钩子')
	// 	next()
	// },
	beforeRouteUpdate(to, from, next) {              // 只有当前路由 切换参数时  才触发函数        例如： /C/12 切换 /C/2
		// console.log('进入update路由钩子')
		// console.log(to.params)
	},
	
	methods: {

	},
	mounted() {
		// console.log('mounted')
		// console.log(this)
	}
}
</script>



