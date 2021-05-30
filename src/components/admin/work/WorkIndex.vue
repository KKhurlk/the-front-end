<template>

	<el-container style="height: 650px; border: 1px solid #eee">
	<SideWork :msg='msg' @childone-name='one' ref="sideWork"></SideWork>
	  <el-container>
	    
	    <el-main>
	      <NowWork :msg='msg' @childtwo-name='two' ref="nowWork"></NowWork>
		  <SuccessWork ref="successWork"></SuccessWork>
		  
	    </el-main>
	  </el-container>
	</el-container>
	
</template>

<script>
	import SideWork from './SideWork'
	import NowWork from './NowWork'
	import SuccessWork from './SuccessWork'
	
	export default {
		name: 'AppWork',
		components: {SideWork,NowWork,SuccessWork},

	    data() {
	      return {	
			  msg:0,
	      }
	    },
		
		mounted() {
		        document.querySelector('body').setAttribute('style', 'background-color:#F1FAFA')
		    },
		beforeDestroy() {
		        document.querySelector('body').removeAttribute('style')
		    },
		methods:{
			one(data){
				console.log('xxxxxxxxxx')
				console.log(data)
				this.msg = data
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
