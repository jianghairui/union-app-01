<template>
	<view class="content">
		<view>
			<navigator url="/pages/demo/pay/pay?title=navigate" hover-class="navigator-hover">
				<button type="default">lesson 1</button>
			</navigator>
			<navigator url="/pages/demo/list/list" hover-class="navigator-hover">
				<button type="default">lesson 2</button>
			</navigator>
			<navigator url="/pages/demo/video/video" hover-class="navigator-hover">
				<button type="default"> subNVue</button>
			</navigator>
			<navigator url="/pages/demo/test/test" hover-class="navigator-hover">
				<button type="default">测试页</button>
			</navigator>
			
		</view>
	</view>
</template>

<script>
	var _self;

	export default {
		data() {
			return {
				loading: false,
				disabled: false
			}
		},
		
		onLoad(param) {
			_self = this;
			console.log(param);
		},
		
		methods: {
			
		},
		onHide() {
			// console.log('隐藏首页');
		},
		onShow() {
			// console.log('显示首页');
		}
	}
</script>

<style>
	
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;//
		flex-wrap: wrap;
	}
	
	button { width: 375rpx;margin-bottom: 15rpx; }
	
	
</style>
