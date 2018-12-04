export default {
	install(Vue) {
		Vue.component('loading', _ => import ('./loading.vue'));
		Vue.component('aliasHeader', _ => import ('./header.vue'));
		Vue.component('aliasFooter', _ => import ('./footer.vue'));
	}
}