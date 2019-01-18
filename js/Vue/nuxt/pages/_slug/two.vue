<template>
    <div>
      <h1>{{ msg }}</h1>
      <nuxt-link to='/user/12'>user</nuxt-link>
    </div>
</template>

<script>

export default {
  data() {
    return {
      msg: '_slug two'
    }
  },
  created() {
  	console.log(this.$router)
  }
}
</script>

