<template>
  <div>
    <el-row style="margin: 18px 0px 0px 18px ">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/admin/dashboard' }">管理中心</el-breadcrumb-item>
        <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        <el-breadcrumb-item>文件管理</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
    <edit-form @onSubmit="loadFiles()" ref="edit"></edit-form>
    <el-card style="margin: 18px 2%;width: 95%">
      <el-table
        :data="files"
        stripe
        style="width: 100%"
        :max-height="400">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
<!--        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline>
             <el-form-item>
                <span>{{ props.row.path }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column> -->
        <el-table-column
          prop="filename"
          label="文件名称"
          width="100">
        </el-table-column>
<!-- 		<el-table-column
		  prop="ext"
		  label="文件后缀"
		  width="80">
		</el-table-column> -->
		<el-table-column
		  prop="path"
		  label="存储路径"
		  width="350">
		</el-table-column>
        <el-table-column
          prop="size"
          label="文件大小"
          width="100">
        </el-table-column>
        <el-table-column
          prop="type"
          label="类型"
          width="100">
        </el-table-column>
<!--        <el-table-column
          prop="isimg"
          label="是否图片"
          width="80">
        </el-table-column> -->
        <el-table-column
          prop="downcounts"
          label="下载次数"
          width="100">
        </el-table-column>
		<el-table-column
		  prop="uploadtime"
		  label="上传时间"
		  width="120">
		</el-table-column>

        <el-table-column
          fixed="right"
          label="操作"
          width="120">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="editFile(scope.row)"
              type="text"
              size="small">
              编辑
            </el-button>
            <el-button
              @click.native.prevent="deleteFile(scope.row.id)"
              type="text"
              size="small">
              移除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin: 20px 0 20px 0;float: left">
        <el-button>取消选择</el-button>
        <el-button>批量删除</el-button>
		<!-- <edit-form @onSubmit="loadFiles()" ref="edit"></edit-form> -->
      </div>
    </el-card>
  </div>
</template>

<script>
  import EditForm from './EditForm'
  export default {
    name: 'FileManagement',
    components: {EditForm},
    data () {
      return {
        files: []
      }
    },
    mounted () {
      this.loadFiles()
    },
    computed: {
      tableHeight () {
        return window.innerHeight - 320
      }
    },
    methods: {
      deleteFile (id) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            this.$axios
              .post('/admin/content/files/delete', {id: id}).then(resp => {
              if (resp && resp.data.code === 200) {
                this.loadFiles()
              }
            })
          }
        ).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
	  editFile(item) {
	  	this.$refs.edit.dialogFormVisible = true
	  	this.$refs.edit.form = {
	  		id: item.id,
	  		filename: item.filename,
	  		// ext: item.ext,
	  		path: item.path,
	  		size: item.size,
	  		type: item.type,
	  		// isimg: item.isimg,
	  		downcounts: item.downcounts,
	  		uploadtime: item.uploadtime,
	  		itemcategory: {
	  			id: item.itemcategory.id.toString(),
	  			name: item.itemcategory.name
	  		}
	  	}
	  },

      loadFiles () {
        var _this = this
        this.$axios.get('/files').then(resp => {
          if (resp && resp.data.code === 200) {
            _this.files = resp.data.data
          }
        })
      }
    }
  }
</script>

<style scoped>
</style>


