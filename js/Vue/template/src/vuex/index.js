import Vue from 'vue'
import vuex from 'vuex'

import Fstore from '@/page/vuex/F_store'
import Gstore from '@/page/vuex/G_store'
import componentsGlobalStore from '@/page/components_global/componentsGlobalStore'


Vue.use(vuex);
var store = new vuex.Store({ //store对象
	modules: {
		F: Fstore,
		G: Gstore,
		cgs: componentsGlobalStore
	}
})



export default store