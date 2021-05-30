<template>
	<div>
		<el-row style="margin: 18px 0px 0px 18px ">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item :to="{ path: '/admin/dashboard' }">管理中心</el-breadcrumb-item>
				<el-breadcrumb-item>内容管理</el-breadcrumb-item>
				<el-breadcrumb-item>制品推荐管理</el-breadcrumb-item>
			</el-breadcrumb>
		</el-row>
		
		<edit-form @onSubmit="loadArtifacts()" ref="editartifact"></edit-form>
		
		
		<!-- <el-card style="margin: 18px 2%;width: 95%;height:1000px"> -->
			<el-table :data="artifacts.slice((currentPage-1)*pagesize,currentPage*pagesize)" stripe style="width: 100%;height:1000px" >
				<el-table-column type="selection" width="55">
				</el-table-column>

				<el-table-column prop="artifactone" label="制品1" width="420">
				</el-table-column>
				<el-table-column prop="artifacttwo" label="制品2" width="420">
				</el-table-column>
				<el-table-column prop="support" label="支持度" width="100" align="center">
				</el-table-column>


				<el-table-column  label="操作" width="150" align="center">
					<template slot-scope="scope">
						<el-button @click.native.prevent="editArtifact(scope.row)" type="text" size="small">
							编辑
						</el-button>
						<el-button @click.native.prevent="deleteArtifact(scope.row.id)" type="text" size="small">
							移除
						</el-button>
					</template>
				</el-table-column>
			</el-table>
			<br>
			<div style="margin: 0px 0 20px 0;float: left">
				<el-button>取消选择</el-button>
				<el-button>批量删除</el-button>
				<!-- <edit-form @onSubmit="loadFiles()" ref="edit"></edit-form> -->
			</div>
		<!-- </el-card> -->
		
		<el-row>
			<el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pagesize" :total="artifacts.length">
			</el-pagination>
		</el-row>
	</div>
</template>

<script>
	import EditForm from './EditForm'
	export default {
		name: 'ArtifactManagement',
		components: {
			EditForm
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
			handleCurrentChange: function(currentPage) {
				this.currentPage = currentPage
				console.log(this.currentPage)
			},
			
			deleteArtifact(id) {
				this.$confirm('此操作将永久删除该制品推荐, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$axios
						.post('/admin/content/artifacts/delete', {
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
			editArtifact(item) {
				this.$refs.editartifact.dialogFormVisible = true
				this.$refs.editartifact.form = {
					id: item.id,
					artifactone: item.artifactone,
					artifacttwo: item.artifacttwo,
					support: item.support,
					itemcategory: {
						id: item.itemcategory.id.toString(),
						name: item.itemcategory.name
					}
				}
			},

			loadArtifacts() {
				var _this = this
				this.$axios.get('/artifacts').then(resp => {
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
