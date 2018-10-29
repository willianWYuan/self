<template lang="pug">
  #app
    img(src="./assets/logo.png")
    router-view
</template>

<script>
import 'babel-polyfill'

export default {
  name: 'App',
  mounted () {
    // document.onscroll = this.scrollbar;
  },
  methods: {
    scrollbar() {
      let top = document.body.scrollTop || document.documentElement.scrollTop;
      console.log(top);
    }
  }
}
</script>

<style lang="sass">
#app 
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;

.router-link-active
  cursor: pointer;
  color: blue;

</style>
