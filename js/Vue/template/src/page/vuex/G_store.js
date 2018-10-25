export default {
	state: {
		flog: false
	},
	getters: {
		noFlog(state) {
			return !state.flog;
		}
	},
	mutations: {
		m_changeShowFn(state) {
			state.flog = !state.flog
		}
	},
	actions: {
		a_changeShowFn(context) {
			context.commit('m_changeShowFn');
		}
	}
}
