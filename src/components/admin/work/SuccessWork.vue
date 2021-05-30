<template>
	<el-table :data="completeData">
		<el-table-column prop="name" label="已爬取的项目" width="200">
		</el-table-column>
		<el-table-column prop="type" label="类型" width="200">
		</el-table-column>
		
		<el-table-column prop="status" label="状态" width="135"
			:filters="[{ text: '已生成', value: '已生成' }, { text: '未生成', value: '未生成' }]"
			:filter-method="filterStatus"
			filter-placement="bottom-end">
			<template slot-scope="scope">
			  <el-tag
			    :type="scope.row.status === '已生成' ? 'primary' : 'success'"
			    disable-transitions>{{scope.row.status}}</el-tag>
			</template>
		</el-table-column>
		
		
		

		<el-table-column label="操作" width="120" align="left">
			<template slot-scope="scope">
				
				<select-form @onSubmit="loadArtifacts()" ref="editartifact"></select-form>
				
				<!-- <el-button size="mini" @click="handleCreate(scope.row)">生成制品推荐</el-button> -->
			</template>

		</el-table-column>

		<el-table-column>
			<template slot-scope="scope">
				<el-button size="mini" @click="handleDelete(scope.row)">更新数据</el-button>
			</template>
		</el-table-column>

	</el-table>
</template>

<script>
	import SelectForm from './SelectForm'
	export default {
		name: 'NowWork',
		
		components: {
			SelectForm
		},

		data() {
			return {

				completeData: [],
				webName: {
					name: '',
					type: ''
				}
			}
		},
		mounted() {
			this.loadSuccessItem()
		},


		methods: {
			
			timestepToolTip(index) {
						return toolmsg[index / 10]
					},
			
			filterStatus(value, row) {
			        return row.status === value;
			},
			
			loadSuccessItem() {
				var _this = this
				this.$axios.get('/successnames').then(resp => {
					if (resp && resp.data.code === 200) {
						_this.completeData = resp.data.data
						this.loadSuccessItem()
					}
				})
			},
			handleDelete(id) {
				this.$confirm('您是否删除该项目以及生成的制品推荐?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$axios
						.post('/deletesuccesswork', {
							id: id
						}).then(resp => {
							if (resp && resp.data.code === 200) {
								this.loadSuccessItem()
							}
						})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消'
					})
				})
			},
			handleCreate(item) {
				

				
				
				// this.$prompt('请输入您要生成制品推荐的最小支持度', '提示', {
				//           confirmButtonText: '确定',
				//           cancelButtonText: '取消',
				//           inputPattern:  /^-?[1-9]\d*$/,
				//           inputErrorMessage: '格式不正确'
				//         }).then(({ value }) => {
				//           this.$message({
				//             type: 'success',
				//             message: '你输入的最小支持度是: ' + value
				//           });
				//         }).catch(() => {
				//           this.$message({
				//             type: 'info',
				//             message: '取消输入'
				//           });       
				//         });
				var _this = this
				_this.webName.name = row.name;
				_this.webName.type = row.type;
				let data = {
					name: this.webName.name,
					type: this.webName.type,
				};
				// this.$axios
				// 	.post('/createartifact', data)
			}



		}
	}
</script>

<style>
	.el-header {
		background-color: #B3C0D1;
		color: #333;
		line-height: 60px;
	}

	.el-aside {
		color: #333;
	}

	.demo-table-expand {
		font-size: 0;
	}

	.demo-table-expand label {
		width: 90px;
		color: #99a9bf;
	}

	.demo-table-expand .el-form-item {
		margin-right: 0;
		margin-bottom: 0;
		width: 50%;
	}
	

</style>
