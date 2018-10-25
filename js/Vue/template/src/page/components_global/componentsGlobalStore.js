export default {
	state: {
		loadingShow: false
	},
	mutations: {
		isLoadingShowFn(state, isflog) {
			state.loadingShow = isflog
		}
	}
}