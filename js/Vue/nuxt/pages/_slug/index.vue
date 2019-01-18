<template>
    <div>
      <h1>{{ currSlug }}</h1>
    </div>
</template>

<script>

export default {
  data() {
    return {
      msg: '_slug two'
    }
  },
  computed: {
    currSlug() {
      return this.$route.params.slug + '  index'
    }
  },
  created() {
  	console.log(this.$router)
  }
}
</script>

