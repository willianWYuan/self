<template>
    <div>
      <h1>{{ currSlug }}</h1>
      <nuxt-link to='/user/12'>user</nuxt-link>
    </div>
</template>

<script>

export default {
  data() {
    return {
      msg: '_slug three'
    }
  },
  computed: {
    currSlug() {
      return this.$route.params.slug
    }
  },
  created() {
  	console.log(this.$route)
  }
}
</script>

