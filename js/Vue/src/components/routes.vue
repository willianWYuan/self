<template lang="pug">
  div(title="外层路由")
    head-component(:routesList='routesList' @listenToChildEvent='go')

    div 切换参数
      router-link(to="/" tag="b") 【/】
      router-link(to="/swiper" tag="b") 【/swiper】
        
      router-link(to="/routes/tran/88" tag="em") 
        a 【/routes/tran/88】
      router-link(to="/routes/tran/99" tag="i") 【/routes/tran/99】
      router-link(to="/routes/tran/100" tag="s") 【/routes/tran/100】
    p(@click='cobk') history.back()
    router-view
    transition(name="fade")
      router-view(name="a" v-if='show')
    router-view(name="jquery")
</template>

<script>

  import HeadComponent from './HeadComponent.vue'
  export default {
    components: {
      HeadComponent
    }, 
    data() {
      return {
        routesList: [
          '/HelloWorld',
          '/swiper',
          '/routes'
        ],
        show: true
      }
    },

    mounted() {
      
    },
    methods: {
      cobk() {
        console.log(this.$route)
        this.$router.back()   // 相当于history.back()
      },
      go () {
        console.log('子组件HeadComponent通过事件传回来操作')
        this.show = !this.show;
      }
    }
  }
</script>

<style lang="sass">
  .fade-enter-active, .fade-leave-active 
    transition: opacity .5s

  .fade-enter, .fade-leave-to 
    opacity: 0
</style>
