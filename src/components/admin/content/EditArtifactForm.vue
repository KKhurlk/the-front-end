<template>
  <div>
	<button class="add-button" @click="dialogFormVisible = true">添加自定义制品推荐</button>
    <el-dialog
      title="添加/修改制品推荐"
      :visible.sync="dialogFormVisible"
      @close="clear">
      <el-form v-model="form" style="text-align: left" ref="dataForm">
        <el-form-item label="制品1" :label-width="formLabelWidth" prop="artifactone">
          <el-input v-model="form.artifactone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="制品2" :label-width="formLabelWidth" prop="artifacttwo">
          <el-input v-model="form.artifacttwo" autocomplete="off"></el-input>
        </el-form-item>
<!--        <el-form-item label="支持度" :label-width="formLabelWidth" prop="support">
          <el-input v-model="form.support" autocomplete="off"></el-input>
        </el-form-item> -->
		
		
        <el-form-item label="项目分类" :label-width="formLabelWidth" prop="cid">
          <el-select v-model="form.itemcategory.id" placeholder="请选择分类">
            <el-option label="Spring Boot" value="1"></el-option>
            <el-option label="Maven" value="2"></el-option>
            <el-option label="Mylyn" value="3"></el-option>
            <el-option label="Elasticsearch" value="4"></el-option>
            <el-option label="Netty" value="5"></el-option>
            <el-option label="JavaGuide" value="6"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="id" style="height: 0">
          <el-input type="hidden" v-model="form.id" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  // import FileUpload from './FileUpload'
  export default {
    name: 'EditArtifactForm',
	components: {},
    data () {
      return {
        dialogFormVisible: false,
        form: {
          id: '',
          artifactone: '',
          artifacttwo: '',
          support: '',
          itemcategory: {
            id: '',
            name: ''
          }
        },
        formLabelWidth: '120px'
      }
    },
	
	mounted () {
		this.currentTime();
	},
	
    methods: {
      clear () {
        this.form = {
          id: '',
          artifactone: '',
          artifacttwo: '',
          support: '',
          itemcategory: {
            id: '',
            name: ''
          }
        }
      },
      onSubmit () {
        this.$axios
          .post('/defineartifacts', {
            id: this.form.id,
            artifactone: this.form.artifactone,
            artifacttwo: this.form.artifacttwo,
            itemcategory: this.form.itemcategory
          }).then(resp => {
          if (resp && resp.status === 200) {
            this.dialogFormVisible = false
            this.$emit('onSubmit')
          }
        })
      }

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
  
  .add-button {
    background-color: #74DF00; /* Green */
    border: none;
    margin: 20px 0 0 20px;
    border-radius: 5px;
    color: white;
    padding: 10px 20px;
    text-align: center;
    display: inline-block;
    font-size: 16px;
    }
</style>