
import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import mA from './module/moduleA'
import mB from './module/moduleB'

Vue.use(Vuex)

let a = {
  state: mA,
  mutations
  
}

let b = {
  state: mB,
}

let store = new Vuex.Store({
  // strict: process.env.NODE_ENV !== 'production',
  debug: true,
  actions,
  modules: {
    a, b
  }
})

export default store
