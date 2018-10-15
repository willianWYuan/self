<template lang="pug">
  .head(title="当前路由指向props") {{msg}} -- {{routesList}}
    div
      router-link(v-for='(item,index) in routesList' :key='index' :to='item') {{item}} 
      button(@click='SendParent') 切换父组件里的tran
</template>


<script>
import "../assets/css/reset.scss"
export default {
  props: {
    routesList: Array
  },
  data() {
    return {
      
    }
  },
  computed: {
    msg(){ return '子组件Head收到的routesList值' } 
  },
  mounted() {

  },
  methods: {
    SendParent () {
      this.$emit('listenToChildEvent', 'this.message is form child')  //定义事件：listenToChildEvent
    }
  }
}
</script>



<style lang="sass">
.head
  background: green
  color: white
  text-align: center
  height: 44px
  line-height: 44px
  position: fixed
  top: 0
  left: 0
  width: 100%
  div
    display: inline-block
    a
      color: yellow
      border: 1px solid
      display: inline-block
      height: 20px
      line-height: 20px
      text-decoration: none
      font-size: 14px
      margin-left: 14px
      padding: 0 10px
</style>
