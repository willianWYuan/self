<template lang="pug">
  div {{msg + $store.state.a.count}}
</template>


<script>
  export default {
    data() {
      return {
        msg: 'page-total：'
      }
    }
  }

</script>
