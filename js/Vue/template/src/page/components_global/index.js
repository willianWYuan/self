import loading from './loading.vue'
import aliasHeader from './header.vue'
import aliasFooter from './footer.vue'


const addComponent = {
	install(Vue) {
		Vue.component('loading', loading)
		Vue.component('aliasHeader', aliasHeader)
		Vue.component('aliasFooter', aliasFooter)
	}
}



export default addComponent