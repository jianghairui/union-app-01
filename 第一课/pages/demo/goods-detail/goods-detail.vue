<template>
	<view class="container">
		<!-- 轮播图 -->
		<uni-swiper-dot :info="slide" :current="current" mode="default" field="content">
			<swiper class="swiper-box" @change="change" :autoplay="autoplay" :duration="duration" :interval="interval">
				<swiper-item v-for="(item, index) in slide" :key="index">
					<view class="swiper-item">
						<image class="slide" :src="image_url+item" mode="aspectFill" />
					</view>
				</swiper-item>
			</swiper>
		</uni-swiper-dot>
		<!-- 商品介绍 -->
		<view class="introduce-section">
			<text class="title">恒源祥2019春季长袖白色t恤 新款春装</text>
			<view class="price-box">
				<text class="price-tip">¥</text>
				<text class="price">341.6</text>
				<text class="m-price">¥488</text>
				<text class="coupon-tip">限时</text>
			</view>
			<view class="bot-row">
				<text>销量: 108</text>
				<text>库存: 4690</text>
				<text>浏览量: 768</text>
			</view>
		</view>
		
		<!-- 商品详情 -->
		<view class="detail-desc">
			<view class="d-header">
				<text>图文详情</text>
			</view>
			<rich-text :nodes="htmlNodes"></rich-text>
		</view>
		
		<!-- 底部操作菜单 -->
		<view class="page-bottom">
			<navigator url="/pages/demo/index/index" open-type="switchTab" class="p-b-btn">
				<view class="yticon home"></view>
			</navigator>
			<navigator url="/pages/demo/cart/cart" open-type="switchTab" class="p-b-btn">
				<view class="yticon cart"></view>
			</navigator>
			<view :class="{active: favorite}" @click="toFavorite" class="p-b-btn">
				<view class="yticon fav"></view>
			</view>
			<view class="action-btn-group">
				<button type="primary" class=" action-btn no-border buy-now-btn" @click="buy">立即购买</button>
				<button type="primary" class=" action-btn no-border add-cart-btn">加入购物车</button>
			</view>
		</view>
	</view>
</template>

<script>
	import uniSection from '@/components/uni-section/uni-section.vue';
	import uniSwiperDot from '@/components/uni-swiper-dot/uni-swiper-dot.vue';
	import htmlParser from '@/common/html-parser.js';
	import {apiGoodsDetail} from "@/api/shop.js";
	
	var _self;
	
	export default {
		components: {
			uniSection,
			uniSwiperDot
		},
		data() {
			return {
				slide: [],
				autoplay: true,
				interval: 2000,
				duration:1000,
				current: 0,
				mode: 'default',
				image_url: '',
				favorite: true,
				htmlNodes : [],
				strings: '<div style="text-align:center;"><img src="https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png"/></div>'
			}
		},
		onLoad(e) {
			_self = this;
			_self.image_url = this.config.image_url;
			this.getGoodsDetail(e.goods_id);
			
		},
		methods: {
			change(e) {
				this.current = e.detail.current
				// console.log(e)
			},
			getGoodsDetail(goods_id) {
				apiGoodsDetail(goods_id).then(data => {
					// console.log(data,'methods')
					var goods_detail = this.func.src_replace(data.detail);
					this.htmlNodes = htmlParser(goods_detail);
					this.slide = data.pics;
				}).catch((e)=> {
					
				})
			},
			//收藏
			toFavorite(){
				this.favorite = !this.favorite;
			},
			buy(){
				uni.navigateTo({
					url: `/pages/order/createOrder`
				})
			}
		}
		
	}
	
	
</script>

<style lang='scss'>
	/* 轮播图 */
	.swiper-box {
		height: 750rpx;
		.swiper-item {
			flex-direction: column;
			justify-content: center;
			align-items: center;
			background-color: #999;
			color: #fff;
		}
		.slide {
			width: 750rpx;
			height: 750rpx;
		}
	}
	/* 标题简介 */
	.introduce-section {
		background: #fff;
		padding: 20upx 30upx;
		
		.title{
			font-size: 36upx;
			color: #303133;
			height: 50upx;
			line-height: 50upx;
		}
		.price-box{
			display:flex;
			align-items:baseline;
			height: 64upx;
			padding: 10upx 0;
			font-size: 26upx;
			color:#fa436a;
		}
		.price{
			font-size: 35upx;
		}
		.m-price{
			margin:0 12upx;
			color: #909399;
			text-decoration: line-through;
		}
		.coupon-tip{
			align-items: center;
			padding: 4upx 10upx;
			background: #fa436a;
			font-size: 30upx;
			color: #fff;
			border-radius: 6upx;
			line-height: 1;
			transform: translateY(-4upx); 
		}
		.bot-row{
			display:flex;
			align-items:center;
			height: 50upx;
			font-size: 30upx;
			color: #909399;
			text{
				flex: 1;
			}
		}
	}
	
	
	
	
	
	
	
	/*  详情 */
	.detail-desc{
		margin-top: 16rpx;
		.d-header{
			display: flex;
			justify-content: center;
			align-items: center;
			height: 80rpx;
			font-size: 35rpx;
			color: #303133;
			position: relative;
				
			text{
				padding: 0 20rpx;
				background: #fff;
				position: relative;
				z-index: 1;
			}
			&:after{
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translateX(-50%);
				width: 600rpx;
				height: 0;
				content: '';
				border-bottom: 1px solid #ccc; 
			}
		}
	}
	
	.detail-desc img {
		display: block;
		max-width: 100% !important;
	}

	/* 底部操作菜单 */
	.page-bottom{
		position:fixed;
		left: 0;
		bottom:0;
		z-index: 95;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 750rpx;
		height: 100rpx;
		background: rgba(255,255,255,0.8);
		.p-b-btn{
			display:flex;
			align-items: center;
			justify-content: center;
			font-size: 35rpx;
			width: 100rpx;
			height: 80rpx;
			.yticon{
				width: 60rpx;
				height: 60rpx;
				background-position: center;
				background-size: cover;
			}
			.home {
				background-image: url('@/static/home.png');
			}
			.cart {
				background-image: url('@/static/cart.png');
			}
			.fav {
				background-image: url('@/static/fav.png');
			}
			&.active, &.active .yticon{
				color: #008000;
			}
			.icon-fenxiang2{
				font-size: 42upx;
				transform: translateY(-2upx);
			}
			.icon-shoucang{
				font-size: 46upx;
			}
		}
		
		.action-btn-group{
			display: flex;
			height: 100rpx;
			overflow: hidden;
			background: linear-gradient(to right, #ffac30,#fa436a,#F56C6C);
			margin-left: 20rpx;
			position:relative;
			&:after{
				content: '';
				position:absolute;
				top: 50%;
				right: 0;
				height: 28upx;
				width: 0;
				border-right: 1px solid rgba(255,255,255,.5);
			}
			.action-btn{
				display:flex;
				align-items: center;
				justify-content: center;
				width: 215rpx;
				height: 100%;
				font-size: 35rpx ;
				padding: 0;
				background: transparent;
				color: #333333
			}
		}
	}

</style>
