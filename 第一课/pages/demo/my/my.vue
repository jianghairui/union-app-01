<template>  
    <view class="container">  
		<view class="user-section">
			<!-- <image class="bg" src="/static/user-bg.jpg"></image> -->
			<view class="bg"></view>
			<view class="user-info-box">
				<view class="portrait-box">
					<image class="portrait" src="/static/missing-face.png"></image>
				</view>
				<view class="info-box">
					<text class="username">游客</text>
				</view>
			</view>
		</view>
		<view class="cover-container">
			<view class="tj-sction">
				<view class="tj-item">
					<view class="num">128.8</view>
					<view>余额</view>
				</view>
				<view class="tj-item">
					<view class="num">0</view>
					<view>优惠券</view>
				</view>
				<view class="tj-item">
					<view class="num">20</view>
					<view>积分</view>
				</view>
			</view>
			<!-- 订单 -->
			<view class="order-section">
				<view class="order-item" @click="navTo('/pages/order/order?state=0')" hover-class="common-hover"  :hover-stay-time="50">
					<text class="iconfont">&#xe645;</text>
					<text>全部订单</text>
				</view>
				<view class="order-item" @click="navTo('/pages/order/order?state=1')"  hover-class="common-hover" :hover-stay-time="50">
					<text class="iconfont">&#xe608;</text>
					<text>待付款</text>
				</view>
				<view class="order-item" @click="navTo('/pages/order/order?state=2')" hover-class="common-hover"  :hover-stay-time="50">
					<text class="iconfont">&#xe61a;</text>
					<text>待收货</text>
				</view>
				<view class="order-item" @click="navTo('/pages/order/order?state=4')" hover-class="common-hover"  :hover-stay-time="50">
					<text class="iconfont">&#xe64d;</text>
					<text>退款/售后</text>
				</view>
			</view>
		</view>
    </view>  
</template>  
<script>  
	let startY = 0, moveY = 0, pageAtTop = true;
    export default {
		data(){
			return {
				moving: false,
			}
		},
		onLoad(){
			
		},
        methods: {
			
        }  
    }  
</script>  
<style lang='scss'>

	.user-section{
		height: 300upx;
		padding: 100upx 30upx 0;
		position:relative;
		.bg{
			background: #f00;
			position:absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			filter: blur(1px);
			opacity: .7;
		}
	}
	.user-info-box{
		background: #09BB07;
		width: 750rpx;
		height: 180upx;
		display:flex;
		align-items:center;
		position:relative;
		z-index: 1;
		.portrait{
			width: 130upx;
			height: 130upx;
			border:5upx solid #fff;
			border-radius: 50%;
		}
		.username{
			font-size: $font-lg + 6upx;
			color: $font-color-dark;
			margin-left: 20upx;
		}
	}

	.cover-container{
		background: #f5f5f5;
		display: flex ;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		
		.tj-sction{
			/* #ifndef APP-PLUS-NVUE */
			display: flex;
			/* #endif */
			flex-wrap: wrap;
			width: 90%;
			.tj-item{
				background: #fff;
				border-radius: 10rpx;
				display: flex;
				flex-direction: column;
				width: 33.3%;
				height: 140rpx;
				font-size: $font-sm;
				color: #75787d;
				align-items: center;
				justify-content: center;
				.num{
					font-size: $font-lg;
					color: $font-color-dark;
					margin-bottom: 8upx;
				}
			}
			
		}
		
		.order-section{
			padding: 28upx 0;
			margin-top: 20upx;
			.order-item{
				width: 120upx;
				height: 120upx;
				border-radius: 10upx;
				font-size: $font-sm;
				color: $font-color-dark;
			}
			.yticon{
				font-size: 48upx;
				margin-bottom: 18upx;
				color: #fa436a;
			}
			.icon-shouhoutuikuan{
				font-size:44upx;
			}
		}
	}
	
	
	
	
</style>