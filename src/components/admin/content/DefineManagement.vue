<template>
	<div>
		<el-row style="margin: 18px 0px 0px 18px ">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item :to="{ path: '/admin/dashboard' }">管理中心</el-breadcrumb-item>
				<el-breadcrumb-item>内容管理</el-breadcrumb-item>
				<el-breadcrumb-item>制品审核</el-breadcrumb-item>
			</el-breadcrumb>
		</el-row>

		<edit-artifact-form @onSubmit="loadArtifacts()" ref="editartifact"></edit-artifact-form>


		<!-- <el-card style="margin: 18px 2%;width: 95%;height:1000px"> -->
		<el-table :data="artifacts.slice((currentPage-1)*pagesize,currentPage*pagesize)" stripe style="width: 100%;height:100%;margin-bottom: 50px;">
			<el-table-column type="selection" width="55">
			</el-table-column>

			<el-table-column prop="artifactone" label="制品1" width="220">
			</el-table-column>
			<el-table-column prop="artifacttwo" label="制品2" width="220">
			</el-table-column>
			<el-table-column prop="path" label="相关文件" width="350">
				<template scope="scope">
					<el-link>
						<a :href="scope.row.path" target="_blank">
							<i class="el-icon-document">{{scope.row.path}}</i>
						</a>
					</el-link>
				</template>
			</el-table-column>
			
			<el-table-column prop="status" label="状态" width="105" 
				  :filters="[{ text: '已审核', value: '已审核' }, { text: '未审核', value: '未审核' }]"
				  :filter-method="filterStatus"
			      filter-placement="bottom-end">
				  <template slot-scope="scope">
				    <el-tag
				      :type="scope.row.status === '已审核' ? 'primary' : 'success'"
				      disable-transitions>{{scope.row.status}}</el-tag>
				  </template>
			</el-table-column>
			

			


			<el-table-column fixed="right" label="操作" width="180">
				<template slot-scope="scope">
					<el-button @click.native.prevent="defineyes(scope.row.id)" type="text" size="small">
						审核通过
					</el-button>
					<el-button @click.native.prevent="editDefineArtifact(scope.row)" type="text" size="small">
						编辑
					</el-button>
					<el-button @click.native.prevent="deleteDefineArtifact(scope.row.id)" type="text" size="small">
						移除
					</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-row style="margin: 0px 0 20px 0;float: left">
			<el-button>取消选择</el-button>
			<el-button>批量删除</el-button>
			<!-- <edit-form @onSubmit="loadFiles()" ref="edit"></edit-form> -->
		</el-row>
		<!-- </el-card> -->

		<el-row>
			<el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pagesize" :total="artifacts.length">
			</el-pagination>
		</el-row>

	</div>
</template>

<script>
	import EditArtifactForm from './EditArtifactForm'
	export default {
		name: 'ArtifactManagement',
		components: {
			EditArtifactForm
		},
		data() {
			return {
				artifacts: [],
				currentPage: 1,
				pagesize: 10,
			}
		},
		mounted() {

			this.loadArtifacts()
		},
		computed: {
			tableHeight() {
				return window.innerHeight - 320
			}
		},
		methods: {
			
			filterStatus(value, row) {
			        return row.status === value;
			      },
				  
			handleCurrentChange: function(currentPage) {
				this.currentPage = currentPage
				console.log(this.currentPage)
			},

			deleteDefineArtifact(id) {
				this.$confirm('此操作将永久删除该制品推荐, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$axios
						.post('/admin/content/defineartifacts/delete', {
							id: id
						}).then(resp => {
							if (resp && resp.data.code === 200) {
								this.loadArtifacts()
							}
						})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					})
				})
			},


			defineyes(id) {
				this.$confirm('您是否确定审核通过?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					
					this.$axios
						.post('/admin/content/defineyes', {
							id: id,
						}).then(resp => {
							if (resp && resp.data.code === 200) {
								this.loadArtifacts()
							}
						})

					this.$message({
						type: 'success',
						message: '审核通过!'
					});
				}).catch(() => {
					
					this.$message({
						type: 'info',
						message: '已取消审核'
					});
				});
				
			},
			editDefineArtifact(item) {
				this.$refs.editartifact.dialogFormVisible = true
				this.$refs.editartifact.form = {
					id: item.id,
					artifactone: item.artifactone,
					artifacttwo: item.artifacttwo,
					// support: item.support,
					itemcategory: {
						id: item.itemcategory.id.toString(),
						name: item.itemcategory.name
					}
				}
			},

			loadArtifacts() {
				var _this = this
				this.$axios.get('/defineartifacts').then(resp => {
					if (resp && resp.data.code === 200) {
						_this.artifacts = resp.data.data
						console.log(JSON.stringify(resp.data.data))
					}
				})
			}
		}
	}
</script>

<style scoped>
</style>
