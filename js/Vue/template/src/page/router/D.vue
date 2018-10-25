<template>
	<div>
		<h1 @click='gotoCFn'>{{ name }}</h1>
		<d-sub1></d-sub1>
		<br>
		<br>
		<br>
		<br>
		
		<router-view name="a"></router-view>
	</div>
</template>



<script>
import DSub1 from './D_sub1'

export default {
	components: {
		DSub1
	},
	data() {
		return {
			name: 'D'
		}
	},
	methods: {
		gotoCFn() {
			this.$router.replace('/C/123/2', to => {
				alert(1)
			})
		}
	},

	mounted() {
		
		// console.log(this)
	}
}
</script>





<!-- this.$router.push({ path: '/C/123/2'})   ==>   location.href = '/C/123/2' -->
<!-- this.$router.replace({ path: '/C/123/2'})   ==>   location.href = '/C/123/2' -->


