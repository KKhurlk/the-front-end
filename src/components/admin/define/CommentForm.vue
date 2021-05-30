<template>
  <div>
	<el-button @click="dialogFormVisible = true" size="mini">查看详情</el-button>
    <el-dialog
      title="查看/发表评论"
      :visible.sync="dialogFormVisible"
      @close="clear">
      
      <Comment></Comment>
      
<!--      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </div> -->
	  
    </el-dialog>
  </div>
</template>

<script>
  import FileUpload from './FileUpload'
  import Comment from './Comment'
  export default {
    name: 'EditForm',
	components: {FileUpload,Comment},
    data () {
      return {
        dialogFormVisible: false,
      }
    },
	
	mounted () {
		this.currentTime();
	},
	
    methods: {
    }
  }
</script>

<style scoped>
  .el-icon-circle-plus-outline {
    margin: 50px 0 0 20px;
    font-size: 100px;
    float: left;
    cursor: pointer;
  }
</style>