<template>
    <div>
      <h1>{{ currId }}</h1>
    </div>
</template>

<script>

export default {
  data() {
    return {
      msg: 'two'
    }
  },
  computed: {
  	currId() {
  		return this.$route.params.id
  	}
  },
  created() {
  	console.log(this.$route)
  }
}
</script>

