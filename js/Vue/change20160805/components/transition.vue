<template lang="pug">
  div(title="当前路由指向tran")
    p 当前网址参数：{{cans}}
    button(@click="add") add
    button(@click="reduce") reduce
    .num()
      transition(name="fade"
                 v-for='(item,index) in numbersList' :key='index'
                 @after-leave="afterLeave")
        span(v-show="item.show") {{ item.zi }}

  </div>
</template>


<script>


export default {
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      numb: 7,
      numbersList: [{
        zi: 1,
        show: true
      }, {
        zi: 2,
        show: true
      }, {
        zi: 3,
        show: true
      }, {
        zi: 4,
        show: true
      }, {
        zi: 5,
        show: true
      }, {
        zi: 6,
        show: true
      }, {
        zi: 7,
        show: true
      }]
    }
  },
  mounted() {
    
  },
  computed: {
    cans() {
      return this.$route.params.mid
    }
  },
  methods: {
    afterLeave() {
      this.numbersList.forEach((item, i) => {
        if (!item.show) this.numbersList.splice(i, 1);
      })
    },

    add() {
      if (this.numbersList.length >= 9) return;
      this.numb++;
      this.numbersList.push({
        zi: this.numb,
        show: false
      })
      setTimeout(() => {
        this.numbersList[this.numbersList.length - 1].show = true
      }, 15)
    },
    reduce() {
      if (!this.numbersList.length) return;
      let ram = parseInt(Math.random() * this.numbersList.length);
      this.numbersList[ram].show = false
    }

  }
}
</script>



<style lang="sass">
@import "../assets/css/reset"

.fade-enter-active, .fade-leave-active 
  transition: opacity .5s

.fade-enter, .fade-leave-to 
  opacity: 0


.slide-fade-enter-active 
  transition: all .3s ease

.slide-fade-leave-active 
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0)

.slide-fade-enter, .slide-fade-leave-to 
  transform: translateX(10px)
  opacity: 0


.flip-list-move 
  transition: transform 1s

button
  background: red
  padding: 4px 10px
  border: none
  color: white
  margin: 0 2px


.num
  margin: 10px auto 0
  width: 78px
  text-align: left
  span 
    margin: 2px
    display: inline-block 
    border: 1px solid #999 
    width: 20px
    height: 20px
    line-height: 20px
    text-align: center
    font-family: fantasy
</style>
