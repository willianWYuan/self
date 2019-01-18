<template>
    <div>
      <div class="h1">{{ title }} <span class="red">red</span></div>
      <h2 @click="$store.commit('increment')">{{ $store.state.counter }}</h2>
      <nuxt-link to='/'>two</nuxt-link>
		<el-button type="danger" plain>button</el-button>
    </div>
</template>

<script>

import axios from 'axios';
export default {
	data() {
		return {
			title: 'title',
		}
	},
	asyncData(context) {
		// console.log(context)
		return {
			title: '%s - Hello World!'
		}
	},
	head() {
		return {
			title: this.title,
			meta: [{
				hid: 'description',
				name: 'description',
				content: 'My custom description'
			}]
		}
	},
	fetch(context) {
		// console.log(context)
	},
	created() {
		// console.log(this.$nuxt.$loading)
		
	},
	mounted() {
		this.$nextTick(_ => {
			// this.$nuxt.$loading.start();
			setTimeout(() => {
				this.$nuxt.$loading.finish();
			}, 1000)
		})
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