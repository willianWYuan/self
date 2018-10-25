<template>
  <div id="app" v-cloak>
    <!-- <img src="./assets/logo.png" @click='goBack'> -->
    <!-- <alias-header></alias-header> -->
    <transition name="ltr">
        <!-- <keep-alive> -->
          <router-view class="app-content"></router-view>
        <!-- </keep-alive> -->
    </transition>
    <!-- <alias-footer></alias-footer> -->
    <!-- <loading></loading> -->
  </div>
</template>

<script>
import './assets/mint-ui.css'
import './assets/element-ui.css'
import './assets/reset.css'

export default {
    name: 'App',
    data() {
        return {

        }
    },
    methods: {

    },
    mounted() {
      // console.log(this)
    },
    watch: {
        '$route' (to, from) {

        }
    }
}

</script>

<style lang="sass">
#app 
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased
    -moz-osx-font-smoothing: grayscale
    -webkit-tap-highlight-color: transparent;
    text-align: center
    color: #2c3e50
    overflow: hidden
    transform: translateZ(0)
    backface-visibility: hidden
    perspective: 1000;
    height: 100vh
    width: 100vw
    .app-content 
        position: absolute
        top: 0
        left: 0
        height: 100vh
        right: 0
        bottom: 0
        // padding: 51px 0
        overflow-y: auto
        box-sizing: border-box

  
.fade-enter-active, .fade-leave-active  
    transition: opacity .5s;
.fade-enter, .fade-leave-to   
    opacity: 0;

.ltr-enter-active, .ltr-leave-active, .rtl-enter-active, .rtl-leave-active  
    transition: all .4s ease-out; 
    position: static;
.ltr-enter, .ltr-leave-to, .rtl-enter, .rtl-leave-to   
    opacity: 0; 
    position: absolute;
.ltr-enter 
    transform: translateX(100%)
.ltr-leave-to 
    transform: translateX(-200%)
.rtl-enter 
    transform: translateX(-100%)
.rtl-leave-to 
    transform: translateX(500%)





</style>
