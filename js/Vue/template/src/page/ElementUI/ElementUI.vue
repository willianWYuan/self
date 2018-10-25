<template>
	<div>
		<el-table ref="multipleTable" :data="currList" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
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
import ElementUI, { Table, TableColumn, Button, Pagination } from 'element-ui';
console.log(ElementUI)
Vue.component(Table.name, Table);
Vue.component(TableColumn.name, TableColumn);
Vue.component(Button.name, Button);
Vue.component(Pagination.name, Pagination);

export default {
	data() {
		return {
			currpage: 1,
			showSize: 2,
			tableData3: [{
				date: '2016-05-02',
				name: '王小虎1',
				address: '上海市普陀区金沙江路 1518 弄'
			}, {
				date: '2016-05-04',
				name: '王小虎2',
				address: '上海市普陀区金沙江路 1517 弄'
			}, {
				date: '2016-05-01',
				name: '王小虎3',
				address: '上海市普陀区金沙江路 1519 弄'
			}, {
				date: '2016-05-03',
				name: '王小虎4',
				address: '上海市普陀区金沙江路 1516 弄'
			},{
				date: '2016-05-02',
				name: '王小虎5',
				address: '上海市普陀区金沙江路 1518 弄'
			}, {
				date: '2016-05-04',
				name: '王小虎6',
				address: '上海市普陀区金沙江路 1517 弄'
			}, {
				date: '2016-05-01',
				name: '王小虎7',
				address: '上海市普陀区金沙江路 1519 弄'
			}, {
				date: '2016-05-03',
				name: '王小虎8',
				address: '上海市普陀区金沙江路 1516 弄'
			}],
			multipleSelection: []
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
		delFn(rwo, index){
			console.log(rwo, index)
			this.tableData3.splice(index, 1)
		}
	},
	mounted() {

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



