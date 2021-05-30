<template>
	<div>
		<search-bar @onSearch="searchResult" ref="searchBar" class="searchbar"></search-bar>
		<!-- <el-row style="height: 840px;"> -->
			<!-- <h2>欢迎：admin</span></h2> -->
			<!-- 			<h3>制品推荐列表</span></h3> -->
			</br>
			
			
			
			<el-table :data="artifacts.slice((currentPage-1)*pagesize,currentPage*pagesize)" stripe style="width: 100%;margin-bottom: 50px;">
				<el-table-column prop="id" label="ID"  width="55">
				</el-table-column>
			
				<el-table-column prop="artifactone" label="制品1" width="250">
				</el-table-column>
				<el-table-column prop="artifacttwo" label="制品2" width="250">
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
				
				<el-table-column label="评论" width="150" align="left">
					<comment-form></comment-form>
					<!-- <el-link style="border-right-style:none;border-left-style:none;border-top-style:none;border-bottom-style:none">查看</el-link> -->
				</el-table-column>
			</el-table>



<!-- 			<table width="1150" class="table">
				<tr>
					<td>ID</td>
					<td>制品1</td>
					<td>制品2</td>
					<td>相关文件</td>
					<td>状态</td>
				</tr>
				<tr effect="dark" placement="right" v-for="item in artifacts.slice((currentPage-1)*pagesize,currentPage*pagesize)"
				 :key="item.id">
					<td style="font-size:10pt">{{item.id}}</td>
					<td style="font-size:10pt">{{item.artifactone}}</td>
					<td style="font-size:10pt">{{item.artifacttwo}}</td>
					<td>
						<el-link>
							<a :href="item.path" target="_blank">
								<i class="el-icon-document">{{item.path}}</i>
							</a>
						</el-link>
					</td>


					<td style="font-size:10pt">{{item.status}}</td>
				</tr>
			</table> -->
			
			<hr>
			<edit-form @onSubmit="loadArtifacts()" ref="edit"></edit-form>
		<!-- </el-row> -->
		<el-row>
			<el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pagesize" :total="artifacts.length">
			</el-pagination>
		</el-row>
	</div>
</template>



<script>
	import EditForm from './EditForm'
	import SearchBar from './SearchBar'
	import CommentForm from './CommentForm'
	export default {
		name: 'Artifacts',
		props: ['msg'],
		components: {
			EditForm,
			SearchBar,
			CommentForm
		},
		data() {
			return {
				activeName: 'first',
				artifacts: [],
				currentPage: 1,
				pagesize: 12,
				historyname: ''
			}
		},
		mounted: function() {
			this.loadArtifacts()
		},
		methods: {
			filterStatus(value, row) {
			        return row.status === value;
			},
			
			loadArtifacts() {
				var _this = this
				this.$axios.get('/defineartifacts').then(resp => {
					if (resp && resp.data.code === 200) {
						_this.artifacts = resp.data.data
					}
				})
			},
			handleCurrentChange: function(currentPage) {
				this.currentPage = currentPage
				console.log(this.currentPage)
			},
			searchResult() {
				var _this = this
				this.$axios
					.get('/search/artifact?keywords=' + this.$refs.searchBar.keywords, {}).then(resp => {
						if (resp && resp.data.code === 200) {
							_this.artifacts = resp.data.data
						}
					})
			},
			lookArtifact(item) {
				console.log(item)
				var cid = this.msg
				var url = ''
				this.$axios
					.post('/gethistory', {
						id: cid
					}).then(resp => {
						if (resp && resp.data.code === 200) {
							this.historyname = resp.data.data
							url = 'https://github.githistory.xyz/' + this.historyname + '/blob/master/' + item
							console.log(url)
							this.gotolink(url)

						}
					})

			},
			gotolink(url) {
				window.open(url, '_blank')
			},

			handleClick(tab, event) {
				console.log(tab, event);
				if (tab.name == 'all') {
					// 触发‘all’事件
					this.selectTypeAllArtifacts('all')
				} else if (tab.name == 'commits') {
					// 触发‘commits’事件
					this.selectTypeCommitsArtifacts('commits');
				} else if (tab.name == 'pullrequests') {
					// 触发‘pullrequests’事件
					this.selectTypePullRequestsArtifacts('pull requests')
				} else {
					// 触发‘context_prs’事件
					this.selectTypeCombinesArtifacts('context_prs')
				}
			},

			selectTypeAllArtifacts(all) {
				console.log(this.msg)
				var _this = this
				var cid = this.msg
				var url = 'itemcategories/' + cid + '/artifacts/' + all
				console.log(url)
				this.$axios.get(url).then(resp => {
					if (resp && resp.data.code === 200) {
						_this.artifacts = resp.data.data
						console.log(JSON.stringify(resp.data.data))
					}
				})
			},
			selectTypeCommitsArtifacts(commits) {
				console.log('commitscommitscommits')
				var _this = this
				var cid = this.msg
				var url = 'itemcategories/' + cid + '/artifacts/' + commits
				console.log(url)
				this.$axios.get(url).then(resp => {
					if (resp && resp.data.code === 200) {
						_this.artifacts = resp.data.data
					}
				})
			},
			selectTypePullRequestsArtifacts(pullrequests) {
				var _this = this
				var cid = this.msg
				var url = 'itemcategories/' + cid + '/artifacts/' + pullrequests
				console.log(url)
				this.$axios.get(url).then(resp => {
					if (resp && resp.data.code === 200) {
						console.log(pullrequests)
						_this.artifacts = resp.data.data
					}
				})
			},
			selectTypeCombinesArtifacts(context_prs) {
				console.log('combinecombinecombinecombine')
				var _this = this
				var cid = this.msg
				var url = 'itemcategories/' + cid + '/artifacts/' + context_prs
				this.$axios.get(url).then(resp => {
					if (resp && resp.data.code === 200) {
						_this.artifacts = resp.data.data
					}
				})
			},


			deleteArtifact(id) {
				this.$confirm('此操作将永久删除该推荐, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$axios
						.post('/delete/artifact', {
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
				// alert(id)
			},
			editArtifact(item) {
				this.$refs.edit.dialogFormVisible = true
				this.$refs.edit.form = {
					id: item.id,
					artifactone: item.artifactone,
					artifacttwo: item.artifacttwo,
					support: item.support,
					itemcategory: {
						id: item.itemcategory.id.toString(),
						name: item.itemcategory.name
					}
				}
			}
		}
	}
</script>

<style scoped>
	img {
		width: 115px;
		height: 172px;
		/*margin: 0 auto;*/
	}

	table {
		border-collapse: collapse;
		margin: 0 auto;
		text-align: center;
	}

	table td,
	table th {
		border: 1px solid #cad9ea;
		color: #666;
		height: 30px;
	}

	table thead th {
		background-color: #CCE8EB;
		width: 100px;
	}

	table tr:nth-child(odd) {
		background: #fff;
	}

	table tr:nth-child(even) {
		background: #F5FAFA;
	}

	.searchbar {
		margin-left: 600px;
		margin-bottom: 500px;
	}


	.title {
		font-size: 14px;
		text-align: left;
	}

	.author {
		color: #333;
		width: 102px;
		font-size: 13px;
		margin-bottom: 6px;
		text-align: left;
	}

	.abstract {
		display: block;
		line-height: 17px;
	}

	a {
		text-decoration: none;
	}

	a:link,
	a:visited,
	a:focus {
		color: #3377aa;
	}

	.el-tabs {
		width: 1150px;
	}
</style>
