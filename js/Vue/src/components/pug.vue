<template lang="pug">
  div(title="当前路由指向pug")
    router-link(to="/" v-bind:class='{active: show}' tag="p") {{msg}}
    div
      span(v-for='item, index) in List' :date-key='index' :key='index') {{item}}
</template>


<script>
import "../assets/css/reset.scss"

export default {
  name: 'HelloWorld',
  data() {
    return {
      msg: '返回"/routes"',
      show: true,
      List: ['[vue]','[router]','[router-link]','[router-view]','[pug]','[v-for]','[v-if]']
    }
  },
  methods: {

  }
}
</script>



<style lang="sass">
span
  margin: 2px;
</style>
