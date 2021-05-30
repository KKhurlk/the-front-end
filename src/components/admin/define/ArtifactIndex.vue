<template>
  <!-- <el-container > -->
<!--   <el-aside style="width: 200px;margin-top: 20px">
      <switch></switch>
      
	  <SideMenu @indexSelect="listByCategory" ref="sideMenu"></SideMenu>
    </el-aside>
	 -->
	
	<div >
		<el-row style="margin: 18px 0px 0px 18px ">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item :to="{ path: '/admin/dashboard' }">管理中心</el-breadcrumb-item>
				<el-breadcrumb-item>制品推荐</el-breadcrumb-item>
				<el-breadcrumb-item>自定义推荐</el-breadcrumb-item>
			</el-breadcrumb>
			
		</el-row>
	  <SelectMenu @indexSelect="listByCategory" ref="selectMenu"></SelectMenu>
      <artifacts :msg="msg" class="artifacts-area" ref="artifactsArea"></artifacts>
    </div>
  <!-- </el-container> -->
</template>

<script>
  import SelectMenu from './SelectMenu'
  import Artifacts from './Artifacts'
  export default {
    name: 'AppArtifactset',
	components: {SelectMenu,Artifacts},
	data() {
	  return {	
		  msg:0,
	  }
	},
	// mounted() {
	//         document.querySelector('body').setAttribute('style', 'background-color:#F1FAFA')
	//     },
	// beforeDestroy() {
	//         document.querySelector('body').removeAttribute('style')
	//     },
	methods: {
	     listByCategory () {
	       var _this = this
	       var cid = this.$refs.selectMenu.cid
	       var url = 'itemcategories/' + cid + '/artifactsdefine'
		   this.msg = cid
	       this.$axios.get(url).then(resp => {
	         if (resp && resp.data.code === 200) {
	           _this.$refs.artifactsArea.artifacts = resp.data.data
	         }
	       })
	     }
	   }
	 
  }
</script>

<style scoped>
 .artifacts-area {
    width: 100%;
    margin-left: 0px;
    margin-right: auto;
  }
</style>