<template>
    <div>
      <div class="h1">{{ title | RMB }} <span class="red">red</span></div>
      <h2 @click="$store.commit('increment')">{{ $store.state.counter }}</h2>
      <nuxt-link to='/'>two</nuxt-link>
		<el-button type="danger" plain @click='changeTitleFn'>button</el-button>
    </div>
</template>

<script>
export default {
	data: () => ({
		title: 'title',
	}),
	asyncData(context) {
		return {
			titleTemplate: '%s - Hello World!'
		}
	},
	// head() {
	// 	return {
	// 		title: this.title,
	// 		meta: [{
	// 			hid: 'description',
	// 			name: 'description',
	// 			content: 'My custom description'
	// 		}]
	// 	}
	// },
	fetch(context) {
		// console.log(context)
	},
	created() {
		// console.log(this.$nuxt.$loading)
		
	},
	mounted() {
		this.$nextTick(_ => {
			this.$nuxt.$loading.start();
			setTimeout(() => {
				this.$nuxt.$loading.finish();
			}, 1000)
		})
	},
	methods: {
		changeTitleFn() {
			this.titleTemplate = !this.titleTemplate
		}
	},
	watch: {
		titleTemplate() {
			console.log(this)
		}
	}
}
</script>

<style scoped lang="scss">
.h1 {
	font-size: 40px; font-weight: 100;
	.red{
		color: red;
		font-size: 16px;
	}
}
</style>