<template>
	<div class="footer">
		<!-- exact 无误差精确匹配 -->
		<!-- class="router-link-active"         可匹配(根)路由    -->
		<!-- class="router-link-exact-active"   精确匹配路由    -->
		<router-link to='/' exact>首页</router-link>
		<router-link to='/A' >组件</router-link>
		<router-link to='/D' >路由</router-link>
		<router-link to='/F' >仓库</router-link>
		<router-link to='/P' >axios</router-link>
	</div>
</template>

<script>
	export default {

	}
</script>

<style scoped>
	.footer{
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		background: #f6f6f6;
		border-top: 1px solid #eee;
		display: flex;
		z-index: 200;
		font-size: .8rem; 
	}
	.footer a{
		flex-grow: 1;
		display: inline-flex;
		justify-content: center;
		align-items: center;
		height: 50px;
	}
	.router-link-active{
		color: #fff;
		background: #14c2e0
	}
</style>
