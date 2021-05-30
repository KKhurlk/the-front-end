<template>
	<div>
		<el-button size="mini" @click="dialogFormVisible = true">生成依赖关系</el-button>
		<el-dialog
		  title="支持度设置"
		  :visible.sync="dialogFormVisible"
		  @close="clear">

			  
			  <el-slider v-model="timestep" :step="10" :format-tooltip="timestepToolTip" show-stops :max="40" :marks="marks"></el-slider>


		  <div slot="footer" class="dialog-footer">
		    <el-button @click="dialogFormVisible = false">取 消</el-button>
		    <el-button type="primary" @click="onSubmit">确 定</el-button>
		  </div>
		</el-dialog>
	    
	</div>
</template>

<script>
	
	 export default {
		data() {
			return {
				dialogFormVisible: false,
				formLabelWidth: '120px',
				marks: {
				          
				          10: '较弱',
				          20: '一般',
						  30: '较强',
						  40: '强',
				        }
			}
		},

		

		
		methods: {
			timestepToolTip(index) {
				return toolmsg[index / 10]
			},

		  onSubmit () {
		        this.$emit('onSubmit')

		  }
		
		}
	  }

</script>

<style>

</style>
