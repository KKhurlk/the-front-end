<template>
  <el-select v-model="asideMenu.name" filterable placeholder="请选择项目名" @change="handleSelect" 
  style="width:250px; height:30px;margin-bottom: 0px; margin-left:0px;margin-top: 20px;">
    <el-option
      v-for="item in noChildren()"
      :key="item.id"
      :label="item.name"
      :value="item.id">
    </el-option>
  </el-select>
</template>

  <!-- <el-menu
    class="categories"
    default-active="0"
    @select="handleSelect"
    active-text-color="red"
	style="background-color: white">
	<el-menu-item index="0">
	      <i class="el-icon-menu"></i>
	      <span slot="title">全部</span>
	</el-menu-item>
	
	<el-menu-item :index="item.id" v-for="item in noChildren()" :key="item.id">
	    <i :class="'el-icon-menu'"></i>
	    <span slot="title">{{item.name}}</span>
	</el-menu-item>
	
  </el-menu> -->

<script>
  export default {
    name: 'SelectMenu',
  	data () {
  	      return {
  			  
  	        cid: '',
  			
  			asideMenu: []
  	      }
  	    },
  		mounted(){
  			this.loadNames()
  		},
  	    methods: {
  	      handleSelect (key, keyPath) {
  	        this.cid = key
  	        this.$emit('indexSelect')
  	      },
  		  loadNames(){
  		  		var _this = this
  		  		this.$axios.get('/names').then(resp => {
  		  			if (resp && resp.data.code === 200) {
  		  			    _this.asideMenu = resp.data.data
  		  			}
  		  		})
  		  	},
  		  noChildren() {
  		    return this.asideMenu.filter(item =>
  		      !item.children
  		    )
  		  }
  	    }
  		}
</script>
	

<style scoped>
  .categories {
	  
    position: fixed;
    margin-left: 50%;
    left: -480px;
    top: 180px;
    width: 230px;
  }
</style>