<template>
    <div>
      <h1>{{ msg }}</h1>
      <nuxt-child />
    </div>
</template>

<script>

export default {
  data() {
    return {
      msg: 'go'
    }
  }
}
</script>

