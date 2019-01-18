<template>
  <div class="container">
    <!-- <h1 v-if="error.statusCode === 404">{{ message }}</h1> -->
    <!-- <h1 v-else>应用发生错误异常</h1> -->
    <nuxt-link to="/">首 页</nuxt-link>
    <nuxt/>
  </div>
</template>


<script>
export default {
  props: ['error'],
  layout: 'blog', // 你可以为错误页面指定自定义的布局
  computed: {
  	message() {
  		return this.$props.error.message
  	}
  },
  created() {
  	console.log(this)
  }
}
</script>