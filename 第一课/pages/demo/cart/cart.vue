<template>
	<scroll-view class="content">
		<view>
			<view v-for="(item ,index) in poem" :key="index" @click="test(index)">
				{{item}}
			</view>
		</view>
	<!-- 	<view :class="{red:isRed}">
			How are you .
		</view>
		<view :class="[isRed ? 'red' : 'green','article']">
			Fine! Thank you .
		</view> -->
		<!-- <image class="img" src="/static/smile.gif" ></image> -->
	</scroll-view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',//
				isRed: true,
				poem : [
					'大风起兮云飞扬',
					'安得猛士兮守四方',
					'他日若遂凌云志',
					'敢笑黄巢不丈夫',
					'一曲肝肠断',
					'轻羽此去莫留恋',
					'二曲肝肠断',
					'莫向白苹洲上独叹秋水寒',
					'问君此去还谋定佳期'
				]
			}
		},
		onLoad() {
			 console.log('购物车onLoad');
		},
		methods: {
			test: function(e) {
				console.log(f);
			}
		}
		
	}
</script>

<style>
	.content {
		/* #ifndef APP-PLUS-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background-color: #f8f8f8;
	}

	.img {
		width: 750rpx;
		height: 562rpx;
	}
	
	.red {
		color: red;
	}
	
	.green {
		color:green;
	}

	.article {
		background-color:#C0C0C0;
		/* padding: 15rpx; */
	}
	
</style>
