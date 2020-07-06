<template>  
    <view class="container">  
		<view class="user-section">
			<view class="bg"></view>
			<view class="user-info-box">
				<view class="portrait-box">
					<image class="portrait" src="/static/missing-face.png"></image>
				</view>
				<view class="info-box">
					<text class="username">点击登录</text>
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
					<text class="iconfont icon-menu">&#xe645;</text>
					<text class="menu">全部订单</text>
				</view>
				<view class="order-item" @click="navTo('/pages/order/order?state=1')"  hover-class="common-hover" :hover-stay-time="50">
					<text class="iconfont icon-menu">&#xe608;</text>
					<text class="menu">待付款</text>
				</view>
				<view class="order-item" @click="navTo('/pages/order/order?state=2')" hover-class="common-hover"  :hover-stay-time="50">
					<text class="iconfont icon-menu">&#xe61a;</text>
					<text class="menu">待收货</text>
				</view>
				<view class="order-item" @click="navTo('/pages/order/order?state=4')" hover-class="common-hover"  :hover-stay-time="50">
					<text class="iconfont">&#xe64d;</text>
					<text class="menu">退款/售后</text>
				</view>
			</view>
			<!-- 菜单列表 -->
			<view class="menu-box">
				<view class="menu-list">
					<view class="item-left">
						<text class="iconfont icon-menu" style="color:rgb(95, 205, 162);font-size: 48rpx;">&#xe609;</text>
						<text>地址管理</text>
					</view>
					<view class="item-right">
						<text></text>
						<text class="iconfont icon-menu">&#xe601;</text>
					</view>
				</view>
				<view class="menu-list">
					<view class="item-left">
						<text class="iconfont icon-menu" style="color:rgb(151, 137, 247)">&#xe639;</text>
						<text>分享</text>
					</view>
					<view class="item-right">
						<text>邀请好友赢10万大礼</text>
						<text class="iconfont icon-menu">&#xe601;</text>
					</view>
				</view>
				<view class="menu-list">
					<view class="item-left">
						<text class="iconfont icon-menu" style="color:rgb(84, 180, 239)">&#xe614;</text>
						<text>我的收藏</text>
					</view>
					<view class="item-right">
						<text>商品、笔记</text>
						<text class="iconfont icon-menu">&#xe601;</text>
					</view>
				</view>
				<view class="menu-list">
					<view class="item-left">
						<text class="iconfont icon-menu" style="color:rgb(224, 116, 114)">&#xe62a;</text>
						<text>我的钱包</text>
					</view>
					<view class="item-right">
						<text></text>
						<text class="iconfont icon-menu">&#xe601;</text>
					</view>
				</view>
				<view class="menu-list">
					<view class="item-left">
						<text class="iconfont icon-menu" style="color:rgb(224, 116, 114)">&#xe771;</text>
						<text>设置</text>
					</view>
					<view class="item-right">
						<text></text>
						<text class="iconfont icon-menu">&#xe601;</text>
					</view>
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
	
	page {
		background: #f5f5f5;
	}

	.user-section{
		height: 300upx;
		padding: 100upx 30upx 0;
		position:relative;
		.bg{
			background: url('/static/user-bg.jpg') no-repeat center center;
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
		/* background: #09BB07; */
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
			background: #fff;
			border-radius: 10rpx;
			.tj-item{
				width: 33.3%;
				height: 140rpx;
				/* #ifndef APP-PLUS-NVUE */
				display: flex;
				/* #endif */
				flex-direction: column;
				align-items: center;
				justify-content: center;
				font-size: $font-sm;
				color: #75787d;
				.num{
					font-size: $font-lg;
					color: $font-color-dark;
					margin-bottom: 8upx;
				}
			}
			
		}
		
		.order-section{
			/* #ifndef APP-PLUS-NVUE */
			display: flex;
			/* #endif */
			flex-wrap: wrap;
			width: 90%;
			background: #fff;
			border-radius: 10upx;
			margin: 15rpx 0rpx;
			.order-item{
				width: 25%;
				height: 150rpx;
				/* #ifndef APP-PLUS-NVUE */
				display: flex;
				/* #endif */
				flex-direction: column;
				align-items: center;
				justify-content: center;
				.iconfont {
					font-size: 45rpx;
					margin-bottom: 8rpx;
					color: #fa436a;
				}
				.menu {
					font-size: 24rpx;
					margin-bottom: 8upx;
					color: #75787d;
				}
			}
		}
		
		.menu-box {
			/* #ifndef APP-PLUS-NVUE */
			display: flex;
			/* #endif */
			flex-wrap: wrap;
			width: 90%;
			background: #fff;
			border-radius: 10rpx;
			.menu-list {
				width: 100%;
				height: 100rpx;
				/* #ifndef APP-PLUS-NVUE */
				display: flex;
				/* #endif */
				justify-content: space-between;
				font-size: 32rpx;
				position: relative;
				&::after{
					content: '';
					width: calc(100% - 50rpx);
					height: 1rpx;
					background-color: #E4E7ED;
					position: absolute;
					bottom: 0;
					right: 0;
				}
				&:last-child::after{
					display: none;
				}
				.item-left {
					/* #ifndef APP-PLUS-NVUE */
					display: flex;
					/* #endif */
					align-items: center;
					color:#303133;
					.icon-menu {
						font-size: 45rpx;
						margin: 0 20rpx;
					}
				}
				.item-right {
					/* #ifndef APP-PLUS-NVUE */
					display: flex;
					/* #endif */
					align-items: center;
					color:#707377;
					.icon-menu {
						margin-left: 10rpx;
					}
				}
			}
		}
		
	}
	
	
	
	
</style>