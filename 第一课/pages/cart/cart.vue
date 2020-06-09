<template>
	<view class="content">
		<view>
			<view v-for="(item ,index) in poem">
				{{item}}
			</view>
		</view>
		
		<!-- <image class="img" src="/static/smile.gif" ></image> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',//
				poem : [
					'大风起兮云飞扬',
					'安得猛士兮守四方',
					'他日若遂凌云志'
				]
			}
		},
		onLoad() {
			 console.log('购物车onLoad');
		},
		methods: {

		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.img {
		width: 750rpx;
		height: 562rpx;
	}
</style>
