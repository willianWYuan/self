export default {
	state: {
		loadingShow: true
	},
	mutations: {
		isLoadingShowFn(state, isflog) {
			state.loadingShow = isflog
		}
	}
}