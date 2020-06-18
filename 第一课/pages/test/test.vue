<template>
	<view class="content">
		<uni-swiper-dot :info="info" :current="current" mode="default" field="content">
			<swiper class="swiper-box" @change="change" :autoplay="autoplay" :duration="duration" :interval="interval">
				<swiper-item v-for="(item, index) in info" :key="index">
					<view :class="item.colorClass" class="swiper-item">
						<image class="image" :src="item.url" mode="aspectFill" />
					</view>
				</swiper-item>
			</swiper>
		</uni-swiper-dot>
	</view>
</template>

<script>
	import uniSection from '@/components/uni-section/uni-section.vue'
	import uniSwiperDot from '@/components/uni-swiper-dot/uni-swiper-dot.vue'
	export default {
		components: {
			uniSection,
			uniSwiperDot
		},
		data() {
			return {
				info: [
					{
						colorClass: 'uni-bg-green',
						url: '/static/slide2.jpg',
						content: '内容 B'
					},
					{
						colorClass: 'uni-bg-red',
						url: '/static/slide1.jpg',
						content: '内容 A'
					},
					{
						colorClass: 'uni-bg-blue',
						url: '/static/fox.png',
						content: '内容 C'
					}
				],
				autoplay: true,
				interval: 2000,
				duration:1000,
				current: 0,
				mode: 'default'
				
			}
		},
		onLoad() {},
		methods: {
			change(e) {
				this.current = e.detail.current
				// console.log(e)
			}
			
		}
	}
</script>

<style>

	.swiper-box {
		height: 750rpx;
	}

	.swiper-item {
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background-color: #999;
		color: #fff;
	}

	.image {
		width: 750rpx;
		height: 750rpx;
	}

	.uni-bg-red {
		background-color: #ff5a5f;
	}

	.uni-bg-green {
		background-color: #09bb07;
	}

	.uni-bg-blue {
		background-color: #007aff;
	}
	
</style>