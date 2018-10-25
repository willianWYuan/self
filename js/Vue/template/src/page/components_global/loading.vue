<template>
	<div class="loading" v-if='$store.state.cgs.loadingShow'>
		loading...
	</div>
</template>

<script>
	export default {

	}
</script>

<style scoped>
	.loading{
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 20181023
	}
</style>
