import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Transition from '@/components/transition'
import Swiper from '@/components/swiper'
import Pug from '@/components/pug'
import Routes from '@/components/routes'
import Jquery from '@/components/jquery'
import Count from '../vuex/count'
import Total from '../vuex/total'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: {name: 'routes'}   //相当于 redirect: 'routes'（配置需要加name:'routes'）,   跳转到 /routes
    },
    {
      path: '/HelloWorld',
      component: HelloWorld,
    },
    {
      path: '/swiper',
      component: Swiper
    },
    // {
    //   path: '/jquery',
    //   component: Jquery
    // },
    {
      path: '/routes',
      name: 'routes',
      component: Routes,
      children: [
        {
          path: 'tran/:mid',
          components: {
            'default': Pug,
            'a': Transition,
            'jquery': Jquery
          }
        }
      ]
    },

    {
      path: '/count',
      component: Count,
    },
    {
      path: '/total',
      component: Total,
    }
  ]
})



