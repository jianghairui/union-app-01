<template>
	<view class="content">
		<navigator url="/pages/demo/login/login?123" hover-class="navigator-hover">
			<button type="default">未登陆</button>
		</navigator>
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
		},
		onShow() {
			// 获取随机数
		}
	}
</script>
<style>
	
	.content {
		/* #ifndef APP-PLUS-NVUE */
		display: flex;
		/* #endif */
	}
	
	button {
		width: 750rpx;
	}

	
</style>

