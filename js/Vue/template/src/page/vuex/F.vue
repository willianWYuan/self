<template>
	<div>
		<!-- <h1 @click="$store.commit('m_changeShowFn')">{{ name }}</h1> -->
		<h1 @click="$store.dispatch('a_changeShowFn')">{{ name }}</h1>
		<br>
		<br>
		<p @click='$store.state.F.show = !$store.state.F.show'>{{ $store.state.F.show }}</p>
		<br>
		<com-g></com-g>
		<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
	</div>
</template>


<script>
import comG from './G'

import {
	mapState,
	mapGetters,
	mapActions
} from 'vuex';

export default {
	components: {
		comG

	},
	data() {
		return {
			name: 'F_vuex'
		}
	},
	computed: {
		...mapState({
			show: state => state.F.show
		}),
		...mapGetters([
			'noShow',
			'noFlog'
		]),
		firstname() {
			return this.name
		}
	},
	methods: {

	},
	mounted() {

	}
}
</script>



