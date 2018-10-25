<template>
	<div>
		<h1>{{ name }}</h1>
	    <router-link to="/D/child">Go to D</router-link>
		<br>
		<br>
		<br>
		<br>
		<br>
		<br>
		<br>
		<br>
		<br>
		<br>
		<br>
		<br>
		<br>
		<br>
		<br>
		<br>
		<br>
		<br>
		<br>
		<br>
		<br>
		<br>
		<br>
		<br>
		<br>
		<br>
		<br>
		<br>
	    <router-link to='/C/3/4'>/C/3/4</router-link>
	    <br>
		<br>
		<br>
		<br><br>
		<br>
		<br>
		<br><br>
		<br>
		<br>
		<br><br>
		<br>
		<br>
		<br><br>
		<br>
		<br>
		<br><br>
		<br>
		<br>
		<br><br>
		<br>
		<br>
		<br><br>
		<br>
		<br>
		<br>
		<router-link to='/C/64/3'>/C/64/3</router-link>
	</div>
</template>


<script>
export default {
	data() {
		return {
			name: 'C_sub1'
		}
	},
	methods: {
		goBack() {
			window.history.length > 1 ?
				this.$router.go(-1) :
				this.$router.push('/')
		}
	},
	mounted() {
		
	}
}
</script>



