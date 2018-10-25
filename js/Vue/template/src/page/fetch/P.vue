<template>
	<div>
		<h1 @click='$store.commit("isLoadingShowFn", true)'>fetch</h1>
		<select v-model='provinceVal'> <option value="">请选择省份</option> <option v-for='item in provinceList' :value='item.id'>{{ item.name }}</option></select>
		<select v-model='cityVal'>     <option value="">请选择市级</option> <option v-for='item in cityList'     :value='item.id'>{{ item.name }}</option></select>
		<select v-model='areaVal'>     <option value="">请选择区域</option> <option v-for='item in areaList'     :value='item.id'>{{ item.name }}</option></select>
		<div><textarea v-model='detailVal' v-if='areaVal'></textarea></div>
		
	</div>
</template>


<script>

export default {
	data() {
		return {
			addressList: [],
			provinceVal: '',
			cityVal: '',
			areaVal: '',
			detailVal: '',
		}
	},
	computed: {
		provinceList(){
			let arr = [];
			this.detailVal = '';
			this.addressList.forEach(item => {
				if (item.parentid === 0) arr.push(item);
			})
			return arr;
		},
		cityList(){
			this.cityVal = this.detailVal = '';
			let arr = []; 
			this.addressList.forEach(item => {
				if (item.parentid === this.provinceVal) arr.push(item);
			})
			return arr;
		},
		areaList(){
			this.areaVal = this.detailVal = '';
			let arr = [];
			this.addressList.forEach(item => {
				if (item.parentid === this.cityVal) arr.push(item);
			})
			return arr;
		}
	},
	methods: {
		Init() {
			// 存在跨域     /config/index  设置proxytable
			this.fn.axios('/address.json', {}, data => {
				// console.log(data)
				this.addressList = data;
				setTimeout(() => {
					this.$store.commit("isLoadingShowFn", false)
				}, 2000)
			})
		},
	},
	mounted() {
		this.Init();
	}
}
</script>



