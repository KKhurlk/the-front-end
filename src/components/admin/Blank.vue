<template>
	<body>
		<float></float>
		
		<iframe v-bind:src="idone" id="iframeLeft"  width="100%" allowfullscreen frameborder="0"></iframe>
		<!-- <router-link target="_blank" :to="{path:'/blank',query:{id:'1'}}">新页面打开home页</router-link> -->
<!-- 		<iframe src="https://www.baidu.com/" id="mobsf" scrolling="yes"  style="overflow: visible;"
                frameborder="no" width="100%" height="100%"></iframe> -->
		<iframe v-bind:src="idtwo"  id="iframeRight" width="100%" allowfullscreen frameborder="0"></iframe>
	</body>
</template>

<script>
	
	import Float from './Float'
	export default {
		name: 'Blank',
		components: {
			Float,	
		},
		
		data() {
			return {
				idone:'',
				idtwo:'',
				
			}
		},
		created(){
			this.getParams();
		},
		methods: {
			getParams () {
				// 取到路由带过来的参数
				var routerParamsone = this.$route.query.idone;
				var routerParamstwo = this.$route.query.idtwo;
				// 将数据放在当前组件的数据内
				this.idone = routerParamsone;
				this.idtwo = routerParamstwo;
			 },
		},
		watch: {
			// 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
			'$route': 'getParams'
		}

	}
</script>

<style>
	
	#iframeLeft {
	    display: block;
	    border: none;
	    height: 100vh;/*设置高度百分比,一直调到只有一个滚动调为止*/
	    width: 49.9%;
		float: left;
	}
	
	#iframeRight {
	    display: block;
	    border: none;
	    height: 100vh;/*设置高度百分比,一直调到只有一个滚动调为止*/
	    width: 49.9%;
		float: right;
	}
</style>
