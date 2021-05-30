<template>
	<div
	 class="callback float"
	 @click="onClick"
	 @mousedown="down"
	 @touchstart="down"
	 @mousemove="move"
	 @touchmove="move"
	 @mouseup="end"
	 @touchend="end"
	 ref="fu"
	 >
	 <!-- <p @click="callback">返回</p> src="@/assets/images/callbs.jpg"-->
	 <comment-form></comment-form>
	 <!-- <img @click="callback"  alt /> -->
	</div>
</template>

<script>
	import CommentForm from './CommentForm'
	export default {
		components: {
			CommentForm
		},
		
	data() {
	 return {
	  isLoading: false,
	  flags: false, //控制使用
	  position: {
	  x: 0,
	  y: 0,
	  },
	  nx: "",
	  ny: "",
	  dx: "",
	  dy: "",
	  xPum: "",
	  yPum: "",
	 };
	},
	
	methods: {
	 callback() {
	  this.$router.go(-1);
	 },
	 onRefresh() {
	  // window.location.reload();
	  setTimeout((res) => {
	  console.log(res);
	  this.isLoading = false;
	  }, 1000);
	 },
	 down() {
	  this.flags = true;
	  var touch;
	  if (event.touches) {
	  touch = event.touches[0];
	  } else {
	  touch = event;
	  }
	  this.position.x = touch.clientX;
	  this.position.y = touch.clientY;
	  this.dx = this.$refs.fu.offsetLeft;
	  this.dy = this.$refs.fu.offsetTop;
	 },
	 move() {
	  if (this.flags) {
	  var touch;
	  if (event.touches) {
	   touch = event.touches[0];
	  } else {
	   touch = event;
	  }
	  this.nx = touch.clientX - this.position.x;
	  this.ny = touch.clientY - this.position.y;
	  this.xPum = this.dx + this.nx;
	  this.yPum = this.dy + this.ny;
	  let width = window.innerWidth - this.$refs.fu.offsetWidth; //屏幕宽度减去自身控件宽度
	  let height = window.innerHeight - this.$refs.fu.offsetHeight; //屏幕高度减去自身控件高度
	  this.xPum < 0 && (this.xPum = 0);
	  this.yPum < 0 && (this.yPum = 0);
	  this.xPum > width && (this.xPum = width);
	  this.yPum > height && (this.yPum = height);
	  // if (this.xPum >= 0 && this.yPum >= 0 && this.xPum<= width &&this.yPum<= height) {
	  this.$refs.fu.style.left = this.xPum + "px";
	  this.$refs.fu.style.top = this.yPum + "px";
	  // }
	  //阻止页面的滑动默认事件
	  document.addEventListener(
	   "touchmove",
	   function () {
	   event.preventDefault();
	   },
	   false
	  );
	  }
	 },
	 //鼠标释放时候的函数
	 end() {
	  this.flags = false;
	 },
	 onClick() {
	  //在这里我是作为子组件来使用的
	  this.$emit("click");
	 },
	 },
	 }
</script>

<style scoped>
.callback p {
 font-size: 16px;
 color: #fff;
 background: rgba(56, 57, 58, 0.5);
 border-radius: 50%;
 text-align: left;
 width: 50px;
 height: 50px;
 line-height: 50px;
 font-family: PingFang SC;
 font-weight: 600;
 box-shadow: 0 0 10px #fff;
}
.callback img {
 display: block;
 width: 50px;
 height: 50px;
 box-shadow: 0 0 10px rgb(133, 129, 129);
 border-radius: 50%;
 background: #fff;
}
.callback {
 position: fixed;
 top: 40px;
 left: 20px;
 z-index: 99999;
}
.float {
 position: fixed;
 right: 20px;
 top: 60%;
 touch-action: none;
 text-align: left;
 width: 50px;
 height: 50px;
 border-radius: 24px;
 line-height: 48px;
 color: white;
}
</style>
