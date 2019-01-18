<template>
    <div>
      <h1>{{ msg }}</h1>
      <nuxt-link to='/user/two'>two</nuxt-link>
    </div>
</template>

<script>

export default {
  data() {
    return {
      msg: 'five'
    }
  }
}
</script>

