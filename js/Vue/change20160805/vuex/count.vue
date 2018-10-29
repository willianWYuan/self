<template lang="pug">
  .head(title="当前路由指向store")
    h1 {{msg}} 
    div
      span(@click='reduce(1)') reduceMutations -1
      span(@click='add(10)') addMutations +10
    div
      span(@click='reduceAction(10)') reduceActions -10
      span(@click='addAction(1)') addActions +1

    h2 {{$store.state.a.count}}

    button(@click='addArr') addarr
    ul
      li(v-for='(item, index) in dataList') 
        i {{item.a}}
        i {{item.b}}
        i {{item.c}}

    total

</template>


<script>
import total from './total.vue'
import { mapMutations,mapActions } from 'vuex';
export default {
  components: {
    total
  },
  data() {
    return {
      msg: 'Hello Vuex'
    }
  },
  computed: {
    dataList(){
      return this.$store.state.a.list
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    ...mapMutations(['add','reduce','updateList', 'addArr']),
    ...mapActions(['addAction','reduceAction', 'getList']), 
  }
}
</script>



<style lang="sass" scoped>
span
  margin: 2px 4px
  display: inline-block
  border: 1px solid #ccc
  padding: 2px 8px
  cursor: pointer
i
  margin: 2px 4px
  display: inline-block
  border: 1px solid #ccc
  width: 30px
  height: 30px
  line-height: 30px
  padding: 0
</style>
