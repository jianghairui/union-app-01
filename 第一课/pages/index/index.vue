<template>
	<view class="content">
		<image class="img" src="/static/op.gif" ></image>
		<image class="img" src="/static/timg.gif" ></image>
		<view class="text-area">
			<text class="title">{{content1}}</text>
		</view>
		<view class="text-area">
			<text class="title">{{content2}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				content1: '大风起兮云飞扬',
				content2: '安得猛士兮守四方'
			}
		},
		onLoad() {

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

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}
	
	.img {
		width: 750rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
