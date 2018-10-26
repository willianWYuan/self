<template>
	<div>
		<component is="element-sub"></component>
		<el-table ref="multipleTable" :data="currList" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange" v-loading="isLoading">
		    <el-table-column type="index" width="55"></el-table-column>
		    <el-table-column label="日期" width="120">
		    	<template slot-scope="scope"><i class="el-icon-time"></i>{{ scope.row.date }}</template>
		    </el-table-column>
		    <el-table-column prop="name" label="姓名" width="120"></el-table-column>
		    <el-table-column prop="address" label="地址"></el-table-column>
		    <el-table-column label="日期" width="120">
		    	<template slot-scope="scope">
		    		<el-button type="danger" size="small" @click='delFn(scope.row, scope.$index)'>删除</el-button>
		    	</template>
		    </el-table-column>
		</el-table>

		<div class="block">
			<span class="demonstration">大于 7 页时的效果</span>
			<el-pagination layout="prev, pager, next" :page-size="showSize" :total="tableData3.length" @current-change='pageChangeFn'></el-pagination>
		</div>
	</div>
</template>


<script>
import Vue from 'vue'
import ElementUI, { Table, TableColumn, Button, Pagination, Loading } from 'element-ui';
// console.log(ElementUI)
Vue.use(Loading);
Vue.component(Table.name, Table);
Vue.component(TableColumn.name, TableColumn);
Vue.component(Button.name, Button);
Vue.component(Pagination.name, Pagination);


import ElementSub from './sub'
export default {
	components: {
		ElementSub,
	},
	data() {
		return {
			currpage: 1,
			showSize: 5,
			tableData3: [],
			multipleSelection: [],
			isLoading: true
		}
	},
	computed: {
		currList() {
			let prevIndex = (this.currpage - 1) * this.showSize, nextIndex = this.currpage * this.showSize, newArr = [];
			this.tableData3.forEach((item, index) => {
				if (prevIndex <= index && nextIndex > index) newArr.push(item);
			})
			return newArr;
		}
	},

	methods: {
		init() {
			setTimeout(() => {
				this.tableData3 = [
					{date: '2016-05-02',name: '王小虎11111',   address: '上海市普陀区金沙江路 1518'},
					{date: '2016-05-04',name: '王小虎22222',   address: '上海市普陀区金沙江路 1517'},
					{date: '2016-05-01',name: '王小虎33333',   address: '上海市普陀区金沙江路 1519'},
					{date: '2016-05-03',name: '王小虎44444',   address: '上海市普陀区金沙江路 1516'},
					{date: '2016-05-02',name: '王小虎55555',   address: '上海市普陀区金沙江路 1518'},
					{date: '2016-05-04',name: '王小虎66666',   address: '上海市普陀区金沙江路 1517'},
					{date: '2016-05-01',name: '王小虎77777',   address: '上海市普陀区金沙江路 1519'},
					{date: '2016-05-03',name: '王小虎88888',   address: '上海市普陀区金沙江路 1516'},
					{date: '2016-05-02',name: '王小虎999999',  address: '上海市普陀区金沙江路 1518'},
					{date: '2016-05-04',name: '王小虎1111111', address: '上海市普陀区金沙江路 1517'},
					{date: '2016-05-01',name: '王小虎22222',   address: '上海市普陀区金沙江路 1519'},
					{date: '2016-05-03',name: '王小虎333333',  address: '上海市普陀区金沙江路 1516'},
					{date: '2016-05-02',name: '王小虎4444444', address: '上海市普陀区金沙江路 1518'},
					{date: '2016-05-04',name: '王小虎555',     address: '上海市普陀区金沙江路 1517'},
					{date: '2016-05-01',name: '王小虎66666',   address: '上海市普陀区金沙江路 1519'},
					{date: '2016-05-03',name: '王小虎77777',   address: '上海市普陀区金沙江路 1516'}
				]
				this.isLoading = false;
			}, 500);
		},
		toggleSelection(rows) {
			if (rows) {
				rows.forEach(row => {
					this.$refs.multipleTable.toggleRowSelection(row);
				});
			} else {
				this.$refs.multipleTable.clearSelection();
			}
		},
		handleSelectionChange(val) {
			console.log(val)
			this.multipleSelection = val;
		},
		pageChangeFn(val) {
			this.currpage = val
		},
		delFn(rwo, index){    // this.$confirm   this.$message      开启 Vue.use(ElementUI);
			this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				let currIndex = (this.currpage - 1) * this.showSize + index;
				console.log(currIndex)
				this.tableData3.splice(currIndex, 1)
				if (!this.currList.length) this.currpage--;
				this.$message({
					type: 'success',
					message: '删除成功!'
				});
			}).catch(() => {
				this.$message({
					type: 'info',
					message: '已取消删除'
				});
			});
		}
	},
	mounted() {
		this.$nextTick(() => {
			console.log(this)
			this.init();
		})
	}
}
</script>

<style>
  .transition-box {
    margin-bottom: 10px;
    width: 200px;
    height: 100px;
    border-radius: 4px;
    background-color: #409EFF;
    text-align: center;
    color: #fff;
    padding: 40px 20px;
    box-sizing: border-box;
    margin-right: 20px;
  }
</style>



