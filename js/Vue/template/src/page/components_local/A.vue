<template>
	<div>
		<h1>A1</h1>
		<button @click='getSubMethods'>getSubMethods</button>
		<br>
		<br>
		<br>
		<a-sub1 name="My journey with Vue sub1" :postsList='posts' data-field="namer" @my-event='getMyEvent' ref="sub1"></a-sub1>
		<br>
		<component is="a-sub2" name="My journey with Vue sub2" :mathsList='maths' @increase-event='addFn'></component>
	</div>
</template>


<script>
import ASub1 from './A_sub1'
import ASub2 from './A_sub2'

export default {
	components: {
		ASub2,
		ASub1,
	},
	data() {
		return {
			msg: 'A',
			posts: [
			    { id: 1, title: 'My journey with Vue' },
			    { id: 2, title: 'Blogging with Vue' },
			    { id: 3, title: 'Why Vue is so fun' }
			],
			maths: [
			    { id: 1, val: 10 },
			    { id: 2, val: 20 },
			    { id: 3, val: 30 }
			]
		}
	},
	methods: {
		getMyEvent(msg) {
			console.log('接收的数据--------->' + msg) //接收的数据--------->我是子组件中的数据
		},
		addFn(index) {
			this.maths[index].val += 1;
		},
		getSubMethods(){
			this.$refs.sub1.emitEvent(this.msg);
		}
	}
}
</script>



