<template>
    <div>
      <h1>{{ currKey }}</h1>
    </div>
</template>

<script>

export default {
  data() {
    return {
      msg: 'six'
    }
  },
  computed:{
  	currKey() {
  		return this.$route.params.key + 'six'
  	}
  }
}
</script>

