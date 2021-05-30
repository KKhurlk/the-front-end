<template>
	<el-container style="height: 650px; border: 1px solid #eee">
		
	  <el-aside width="350px" style="background-color: white">
		  <!-- <span>  搜索</span> -->
		  <!-- <search-bar @onSearch="onSearch" ref="searchBar"></search-bar> -->
		  <el-input
		    @keyup.enter.native="searchClick"
		    placeholder="请添加项目..."
		    prefix-icon="el-icon-search"
		    size="small"
		    style="width: 200px;margin: 25px 0px 25px 12px;"
		    v-model="inputForm.keywords">
		  </el-input>
		  <el-button size="small" type="primary" icon="el-icon-search" @click="searchClick">确定</el-button>
		  
		<el-table
			:row-style="{height: '70px'}"
		    :data="tableData"
			style="width: 100%"
			@row-click="getDetails">
			    <el-table-column type="expand" width="130">
			      <template slot-scope="props">
			        <el-form label-position="right" inline class="demo-table-expand">
			          <el-table 
					        :row-style="{height: '40px'}"
							:data="selecttableData"
							:show-header="false"
							style="width: 100%">
						  <el-table-column
						     prop="classname"
						     width="138">
						  </el-table-column>
						  
						  <el-table-column >
						    <template slot-scope="scope">
						      <el-button
						        size="mini"
						        @click="getClassName(scope.row)">爬取数据</el-button>
						    </template>
						  </el-table-column>
			          </el-table>
	
			        </el-form>
			      </template>
			    </el-table-column>
				
			<el-table-column
			   prop="name"
			   label="项目名"
			   width="200">
			   <template slot-scope="scope">
				   {{scope.row.name}}
			   </template>
			</el-table-column>	    
		  </el-table>
	  </el-aside>
	  
	  </el-container>
</template>

<script>

	export default {
	name: 'SideWork',
	data () {
	      return {
			  inputForm: {
			  	id: '',
			  	name: ''
			  }, 
				  webName:{
					  name:'',
					  classname:''
				  },
			tableData: [],
			nowtableData: [{
			  date: 'apache/maven'
			}],
			selecttableData: [{
			  classname: 'github-commits'
			},{
			  classname: 'github-pulls'
			},{
			  classname: 'github-context_prs'
			}]
	      }
	    },
		
		mounted(){
			this.loadNames()
		},
		methods: {
			loadNames(){
			var _this = this
			this.$axios.get('/names').then(resp => {
				if (resp && resp.data.code === 200) {
				    _this.tableData = resp.data.data
				}
			})
		},
		
		getClassName(row) {
			 this.$confirm('您是否要将项目添加至爬取列表?', '提示', {
			          confirmButtonText: '确定',
			          cancelButtonText: '取消',
			          type: 'warning'
			        }).then(() => {
						var _this = this
						_this.webName.classname=row.classname;
						
						let data = {
							name: this.webName.name,
							classname: this.webName.classname,
						};
						console.log(data)
						this.$emit('childone-name',data)
						
						this.$axios
						  .post('/addtonowitem', data)
			          this.$message({
			            type: 'success',
			            message: '添加成功!'
			          });
			        }).catch(() => {
			          this.$message({
			            type: 'info',
			            message: '已取消添加'
			          });          
			        });
					
			
			  
		    // console.log(this.webName.classname);
		},
		
		searchClick () {
		  this.$axios
		    .post('/names', {
		      name: this.inputForm.keywords
		    }).then(resp => {
		    if (resp && resp.status === 200) {
		      this.$emit('searchClick')
			   this.loadNames()
		    }
		  })
		},
		getDetails(row){
			var _this = this
			_this.webName.name=row.name
		    console.log(this.webName.name)//此时就能拿到整行的信息
		}
		},
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
