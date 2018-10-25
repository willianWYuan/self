<template>
	<div>
		<mt-navbar v-model="selected">
		  <mt-tab-item id="1">option A</mt-tab-item>
		  <mt-tab-item id="2">option B</mt-tab-item>
		  <mt-tab-item id="3">option C</mt-tab-item>
		</mt-navbar>
		<p>{{ selected }}</p>

		<!-- tab-container -->
		<mt-tab-container v-model="selected">
		  <mt-tab-container-item id="1">
		    <mt-cell v-for="n in 10" :key='n' :title="'content ' + n" />
		  </mt-tab-container-item>
		  <mt-tab-container-item id="2">
		    <mt-cell v-for="n in 4" :key='n' :title="'content ' + n" />
		  </mt-tab-container-item>
		  <mt-tab-container-item id="3">
		    <mt-cell v-for="n in 6" :key='n' :title="'content ' + n" />
		  </mt-tab-container-item>
		</mt-tab-container>
		<div class="el-icon el-icon-search"></div>
	</div>
</template>


<script>
import Vue from 'vue';
import mintUI, { Navbar, TabItem, TabContainer, TabContainerItem, Cell } from 'mint-ui';

Vue.component(Navbar.name, Navbar);
Vue.component(TabItem.name, TabItem)
Vue.component(TabContainer.name, TabContainer)
Vue.component(TabContainerItem.name, TabContainerItem)
Vue.component(Cell.name, Cell)
export default {
	data() {
		return {
			selected: '1',
		}
	},

	methods: {

	},
	mounted() {

	}
}
</script>

>







<!-- 文件 .babelrc
["component", [{
    "libraryName": "mint-ui",
    "style": true
}]] -->
