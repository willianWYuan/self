// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex'

import 'babel-polyfill'
import 'es6-promise/auto'

import fn from './page/common/common'


import addComponents from '@/page/components_global/index'
Vue.use(addComponents)

Vue.prototype.fn = fn;
Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
