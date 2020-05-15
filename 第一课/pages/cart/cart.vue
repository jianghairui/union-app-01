<template>
	<view class="content">
		<image class="img" src="/static/smile.gif" ></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',//
				content1: '大风起兮云飞扬',
				content2: '安得猛士兮守四方',
				content3: '他日若遂凌云志'
			}
		},
		onLoad() {
			switch(uni.getSystemInfoSync().platform){
			    case 'android':
			       console.log('运行Android上')
			       break;
			    case 'ios':
			       console.log('运行iOS上')
			       break;
			    default:
			       console.log('运行在开发者工具上')
			       break;
			}
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

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
