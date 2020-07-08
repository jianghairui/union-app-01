<template>
	<view class="content">
		<video id="myVideo" :src="video_url" :autoplay="autoplay" loop=true controls=false objectFit="fill" muted=true ></video>
	</view>
</template>

<script>
	var _self;
	
	export default {
		
		data() {
			return {
				autoplay : true,
				video_url:"/static/jieyi.mp4"
			}
		},
		methods: {
			
		},
		onLoad() {
			_self = this;
			this.videoContext = uni.createVideoContext('myVideo')
			const subNVue = uni.getSubNVueById('popup');
			subNVue.show('fade-in', 200, function(){
			    // 打开后进行一些操作...  
				subNVue.setStyle({
				    "position": "absolute", //除 popup 外，其他值域参考 5+ webview position 文档
				    "width": "100%",
				    "height": "100%",
				    "left":"0px"
				})
			});
			// 通过 id 获取 nvue 子窗体  
		},
		onShow() {
			// 获取随机数
			this.videoContext.play();
		},
		onHide() {
			console.log('page video hide')
			// 关闭 nvue 子窗体
		},
		onBackPress() {
			console.log('page video backPress')
			// 关闭 nvue 子窗体
		}
	}
</script>
<style>
	
	.content {
		/* #ifndef APP-PLUS-NVUE */
		display: flex;
		/* #endif */
	}
	
	video {
		width: 100vw;
		height: 100vh;
	}
	
	.video-box {
		
	}
	
</style>

