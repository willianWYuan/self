<template>
	<div>
		<h1>{{ name }}</h1>
		<ul>
			<li v-for='(item, index) in mathsList' :key='item.id' @click='$emit("increase-event", index)'>
				{{item.val}}
			</li>
		</ul>
	</div>
</template>


<script>
export default {
	props: ['name', 'mathsList'],
	data() {
		return {
			msg: 'A_sub2'
		}
	},
	methods: {

	},
	mounted() {
		// console.log(this)
	}
}
</script>



