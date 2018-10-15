<template lang="pug">
  div(title="当前路由指向jquery") {{msg}}
</template>


<script>
import "../assets/css/reset.scss"
import $ from 'jquery'

export default {
  data() {
    return {
      msg: '可以使用jquery, 打印在控制台',
    }
  },
  mounted() {
    console.log($)
  }
}
</script>



<style lang="sass">
span
  margin: 2px;
</style>
