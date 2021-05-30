<template>
	<div>
		<search-bar @onSearch="searchResult" ref="searchBar" class="searchbar"></search-bar>
		<!-- <el-row style="height: 840px;"> -->
			<!-- <h2>欢迎：admin</span></h2> -->
<!-- 			<h3>制品推荐列表</span></h3> -->
</br>

			<el-tabs v-model="activeName" type="border-card" class="el-tabs" @tab-click="handleClick" >
				<el-tab-pane label="All" name="all"></el-tab-pane>
				<el-tab-pane label="Commits" name="commits"></el-tab-pane>
				<el-tab-pane label="Pull Requests" name="pullrequests"></el-tab-pane>
				<el-tab-pane label="Context_prs" name="context_prs"></el-tab-pane>
			</el-tabs>

			<table width="1150" class="table">

				<tr>
					<td width="5%">ID</td>
					<td>制品推荐关系</td>
					<!-- <td>制品2</td> -->
					<!-- <td>对比</td> -->
					<td>支持度</td>
					<td>评论</td>
				</tr>
				<tr effect="dark" placement="right" v-for="item in artifacts.slice((currentPage-1)*pagesize,currentPage*pagesize)"
				 :key="item.id">
					<td style="font-size:10pt">{{item.id}}</td>

					<td style="font-size:15pt">
						<el-link>
							<nobr @click="lookArtifact(item.artifactone,item.artifacttwo)">{{item.artifactone}}</nobr>
							
						</el-link>
</br>
						<el-link>
							
							<nobr @click="lookArtifact(item.artifactone,item.artifacttwo)">{{item.artifacttwo}}</nobr>
						</el-link>

					</td>
					
					<!-- <td style="font-size:10pt">查看</td> -->

					<td style="font-size:10pt">{{item.support}}</td>
					<td  align="left">
						<comment-form></comment-form>
					</td>
						
				</tr>

			</table>
			<hr>
			<!-- <h3>上传文件：</h3> -->
			<!-- <edit-form @onSubmit="loadArtifacts()" ref="edit"></edit-form> -->
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
		props:['msg'],
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
			loadArtifacts() {
				var _this = this
				this.$axios.get('/artifacts').then(resp => {
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
			lookArtifact(itemone,itemtwo) {
				console.log(itemone)
				var cid = this.msg
				var urlone =''
				var urltwo =''
				this.$axios
					.post('/gethistory', {
						id: cid
					}).then(resp => {
							if (resp && resp.data.code === 200) {
								this.historyname = resp.data.data
								urlone = 'https://github.githistory.xyz/'+this.historyname+'/blob/master/'+itemone
								urltwo = 'https://github.githistory.xyz/'+this.historyname+'/blob/master/'+itemtwo
								console.log(urlone)
								console.log(urltwo)
								this.gotolink(urlone,urltwo)

							}
						})
				
			},
			gotolink(urlone,urltwo){
				let urlend = this.$router.resolve({path:'/blank',query: {idone:urlone,idtwo:urltwo}})
				window.open(urlend.href,'_blank') 
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
	
	.searchbar{
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
	
	.el-tabs { width: 1150px; }
</style>
