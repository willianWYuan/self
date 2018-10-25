<template>
	<div>
		<h1>{{ name + nums }}</h1>
		<h1 @click="emitEvent">{{ dataField }}</h1>
		<ul>
			<li v-for='item in postsList' :key='item.id'>
				{{item.title}}
			</li>
		</ul>
	</div>
</template>


<script>
export default {
	props: {
		name: String,
		postsList: Array,
		nums: {
			type: [String, Number],
			// required: true,
			default: 100
		},
		dataField: String
	},
	data() {
		return {
			msg: '大概是多少收人头提交人',
		}
	},
	methods: {
		emitEvent() {
			this.$emit('my-event', this.msg)
			//通过按钮的点击事件触发方法，然后用$emit触发一个my-event的自定义方法，传递this.msg数据。
		}
	},

	mounted() {
		console.log(this)
	}
}
</script>





<!-- 子
<h1 @click="$emit('my-event', this.msg)">{{ dataField }}</h1>


父
<a-sub1 name="My journey with Vue sub1" :postsList='posts' data-field="namer" @my-event='getMyEvent'></a-sub1>
getMyEvent(msg) {
	console.log('接收的数据') //接收的数据我是子组件中的数据
} -->