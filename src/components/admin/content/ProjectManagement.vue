<template>
	<div>
		<el-row style="margin: 18px 0px 0px 18px ">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item :to="{ path: '/admin/dashboard' }">管理中心</el-breadcrumb-item>
				<el-breadcrumb-item>内容管理</el-breadcrumb-item>
				<el-breadcrumb-item>项目管理</el-breadcrumb-item>
			</el-breadcrumb>
		</el-row>
		<br>
		<!-- <edit-project-form @onSubmit="loadArtifacts()" ref="editartifact"></edit-project-form> -->

	<el-table :data="completeData.slice((currentPage-1)*pagesize,currentPage*pagesize)" stripe style="width: 100%;height:100%;margin-bottom: 50px;">
		<el-table-column type="selection" width="55">
		</el-table-column>
		<el-table-column prop="name" label="已爬取的项目" width="250">
		</el-table-column>
		<el-table-column prop="type" label="类型" width="200">
		</el-table-column>
		<el-table-column prop="submitter" label="提交者" width="150">
		</el-table-column>
		
		<el-table-column prop="status" label="状态" width="120"
			:filters="[{ text: '已生成', value: '已生成' }, { text: '未生成', value: '未生成' }]"
			:filter-method="filterStatus"
			filter-placement="bottom-end">
			<template slot-scope="scope">
			  <el-tag
			    :type="scope.row.status === '已生成' ? 'primary' : 'success'"
			    disable-transitions>{{scope.row.status}}</el-tag>
			</template>
		</el-table-column>
		
		<el-table-column prop="pair" label="制品对" width="150">
		</el-table-column>
		

		<el-table-column label="操作" width="120" align="right">
			<template slot-scope="scope">
				<el-button size="mini" @click="handleCreate(scope.row)">生成制品推荐</el-button>
			</template>
		</el-table-column>

		<el-table-column>
			<template slot-scope="scope">
				<el-button size="mini" @click="handleDelete(scope.row)">删除</el-button>
			</template>
		</el-table-column>

	</el-table>
	
	<div style="margin: 0px 0 20px 0;float: left">
		<el-button>取消选择</el-button>
		<el-button>批量删除</el-button>
		<!-- <edit-form @onSubmit="loadFiles()" ref="edit"></edit-form> -->
	</div>
	
	<el-row>
		<el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pagesize" :total="completeData.length">
		</el-pagination>
	</el-row>
	</div>
</template>

<script>
	import EditProjectForm from './EditProjectForm'
	export default {
		name: 'ProjectManagement',
		components: {
			EditProjectForm
		},

		data() {
			return {
				completeData: [],
				webName: {
					name: '',
					type: ''
				},
				currentPage: 1,
				pagesize: 10,
			}
		},
		mounted() {
			this.loadSuccessItem()
		},


		methods: {
			
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
				this.$prompt('请输入您要生成制品推荐的最小支持度', '提示', {
				          confirmButtonText: '确定',
				          cancelButtonText: '取消',
				          inputPattern:  /^-?[1-9]\d*$/,
				          inputErrorMessage: '格式不正确'
				        }).then(({ value }) => {
				          this.$message({
				            type: 'success',
				            message: '你输入的最小支持度是: ' + value
				          });
				        }).catch(() => {
				          this.$message({
				            type: 'info',
				            message: '取消输入'
				          });       
				        });
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
