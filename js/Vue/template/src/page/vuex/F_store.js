export default {
	state: {
		show: false
	},
	getters: {
		noShow(state) {
			return !state.show;
		}
	},
	mutations: {
		m_changeShowFn(state) {
			state.show = !state.show
		}
	},
	actions: {
		a_changeShowFn(context) {
			context.commit('m_changeShowFn');
		}
	}
}



// <h1 @click="$store.commit('m_changeShowFn')">mutations</h1>
// <h1 @click="$store.dispatch('a_changeShowFn')">actions</h1>