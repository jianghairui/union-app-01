<template>
	<view class="container">
		<!-- 轮播图 -->
		<uni-swiper-dot :info="pics" :current="current" mode="nav" field="content">
			<swiper class="swiper-box" @change="change" :autoplay="autoplay" :duration="duration" :interval="interval">
				<swiper-item v-for="(item, index) in pics" :key="index">
					<view class="swiper-item">
						<image class="slide" :src="image_url+item" mode="aspectFill" />
					</view>
				</swiper-item>
			</swiper>
		</uni-swiper-dot>
		<!-- 商品介绍 -->
		<view class="introduce-section">
			<text class="title">{{goods_name}}</text>
			<view class="price-box">
				<text class="price-tip">¥</text>
				<text class="price">{{price}}</text>
				<text class="m-price">¥{{origin_price}}</text>
				<text class="coupon-tip">限时</text>
			</view>
			<view class="bot-row">
				<text>销量: {{sales}}</text>
				<text>库存: {{stock}}</text>
				<text>浏览量: 768</text>
			</view>
		</view>
		<!-- 商品属性规格 -->
		<view class="c-list">
			<view class="c-row b-b" @click="toggleSpec">
				<text class="tit">购买类型</text>
				<view class="con">
					<text class="selected-text" v-for="(sItem, sIndex) in specSelected" :key="sIndex">
						{{sItem.value}}
					</text>
				</view>
			</view>
			<view class="c-row b-b">
				<text class="tit">优惠券</text>
				<text class="con t-r red">领取优惠券</text>
			</view>
			<view class="c-row b-b">
				<text class="tit">服务</text>
				<view class="bz-list con">
					<text>7天无理由退换货 ·</text>
					<text>假一赔十 ·</text>
				</view>
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
			<view class="icon-group">
				<navigator url="/pages/demo/index/index" open-type="switchTab">
					<view class="yticon">
						<text class="iconfont icon-kefu1"></text>
					</view>
				</navigator>
				<navigator url="/pages/demo/cart/cart" open-type="switchTab">
					<view class="yticon">
						<text class="iconfont icon-gouwuche"></text>
					</view>
				</navigator>
				<view class="yticon" :class="{active: favorite}" @click="toFavorite">
					<text class="iconfont icon-shoucang1"></text>
				</view>
			</view>
			<view class="action-btn-group">
				<view class="action-btn add-cart-btn">加入购物车</view>
				<view class="action-btn buy-now-btn" @click="buy">立即购买</view>
			</view>
		</view>
	
		<!-- 规格-模态层弹窗 -->
		<view class="popup spec" :class="specClass" @touchmove.stop.prevent="stopPrevent" @click="toggleSpec" >
			<!-- 遮罩层 -->
			<view class="mask"></view>
			<view class="layer attr-content" @click.stop="stopPrevent">
				<view class="a-t">
					<image :src="image_url+pics[0]"></image>
					<view class="right">
						<text class="price">¥{{attr_price}}</text>
						<text class="stock">库存：{{stock}}件</text>
						<view class="selected">
							已选：
							<text class="selected-text" v-for="(sItem, sIndex) in specSelected" :key="sIndex">
								{{sItem.value}}
							</text>
						</view>
					</view>
				</view>
				<view  class="attr-list">
					<text>{{attr_name}}</text>
					<view class="item-list">
						<text v-for="(childItem, index) in specChildList" :key="index" class="tit" :class="{selected: childItem.selected}"
							@click="selectSpec(index)">
							{{childItem.value}}
						</text>
					</view>
				</view>
				<button class="btn" @click="toggleSpec">完成</button>
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
				autoplay: true,
				interval: 2000,
				duration:1000,
				current: 0,
				mode: 'default',
				image_url: '',
				favorite: true,
				specClass: 'none',
				specSelected:[],
				specChildList: [],
				
				goods_name:'',//商品详情
				pics: [],
				origin_price:'',
				price:'',
				stock:'',
				sales:'',
				use_attr:'',
				attr_price:'',
				attr_name: '',
				htmlNodes : []
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
					this.goods_name = data.name;
					this.pics = data.pics;
					this.specChildList = data.attr_list;
					this.origin_price = data.origin_price;
					this.price = data.price;
					this.attr_price = data.price;
					this.stock = data.stock;
					this.sales = data.sales;
					//规格 默认选中第一条
					for(let cItem of _self.specChildList){
						this.$set(cItem, 'selected', true);
						this.price = cItem.price;
						this.attr_price = cItem.price;
						this.specSelected.push(cItem);
						break;
					}
				}).catch((e)=> {
					
				})
			},
			//规格弹窗开关
			toggleSpec() {
				if(this.specClass === 'show'){
					this.specClass = 'hide';
					setTimeout(() => {
						this.specClass = 'none';
					}, 250);
				}else if(this.specClass === 'none'){
					this.specClass = 'show';
				}
			},
			//选择规格
			selectSpec(index){
				let list = this.specChildList;
				list.forEach(item=>{
					this.$set(item, 'selected', false);
				})
				this.$set(list[index], 'selected', true);
				//存储已选择
				/**
				 * 修复选择规格存储错误
				 * 将这几行代码替换即可
				 * 选择的规格存放在specSelected中
				 */
				this.specSelected = []; 
				list.forEach(item=>{ 
					if(item.selected === true){
						this.price = item.price;
						this.attr_price = item.price;
						this.specSelected.push(item); 
					} 
				})
				
			},
			//收藏
			toFavorite(){
				this.favorite = !this.favorite;
			},
			buy(){
				console.log('hello');
				uni.navigateTo({
					url: '/pages/demo/create-order/create-order'
				})
			},
			stopPrevent(){}
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
	
	.c-list{
		font-size: 30upx;
		color: #606266;
		background: #fff;
		.c-row{
			display:flex;
			align-items:center;
			padding: 20upx 30upx;
			position:relative;
		}
		.tit{
			width: 140upx;
		}
		.con{
			flex: 1;
			color: #303133;
			.selected-text{
				margin-right: 10rpx;
			}
		}
		.bz-list{
			color: #303133;
			text{
				display: inline-block;
				margin-right: 30rpx;
			}
		}
		.red{
			color: #FA436A;
		}
	}
	
	/*  详情 */
	.detail-desc{
		margin-top: 16rpx;
		margin-bottom: 100rpx;
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
		.icon-group {
			display:flex;
			width: 300rpx;
			align-items: center;
			justify-content: space-around;
			.yticon{
				width: 60rpx;
				height: 60rpx;
				text {
					font-size: 60rpx;
					color:#909399
				}
			}
		}
		.action-btn-group{
			display: flex;
			height: 100rpx;
			overflow: hidden;
			margin-left: 20rpx;
			position:relative;
			.action-btn{
				display:flex;
				align-items: center;
				justify-content: center;
				width: 215rpx;
				/* height: 100%; */
				font-size: 32rpx ;
				color: #FFFFFF
			}
			.add-cart-btn {
				background-color: #FF7D8D;
			}
			.buy-now-btn {
				background-color: #FF2740;
			}
			.no-border {
				/* border-radius: 0; */
			}
		}
	}

	/*  弹出层 */
	.popup {
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		z-index: 99;
		
		&.show {
			display: block;
			.mask{
				animation: showPopup 0.2s linear both;
			}
			.layer {
				animation: showLayer 0.2s linear both;
			}
		}
		&.hide {
			.mask{
				animation: hidePopup 0.2s linear both;
			}
			.layer {
				animation: hideLayer 0.2s linear both;
			}
		}
		&.none {
			display: none;
		}
		.mask{
			position: fixed;
			top: 0;
			width: 100%;
			height: 100%;
			z-index: 1;
			background-color: rgba(0, 0, 0, 0.4);
		}
		.layer {
			position: fixed;
			z-index: 99;
			bottom: 0;
			width: 100%;
			min-height: 40vh;
			border-radius: 10rpx 10rpx 0 0;
			background-color: #FFFFFF;
			.btn{
				width: 690rpx;
				height: 66rpx;
				line-height: 66rpx;
				border-radius: 100rpx;
				background: #fa436a;
				font-size: 34rpx;
				color: #fff;
				margin: 0;
			}
		}
		@keyframes showPopup {
			0% {
				opacity: 0;
			}
			100% {
				opacity: 1;
			}
		}
		@keyframes hidePopup {
			0% {
				opacity: 1;
			}
			100% {
				opacity: 0;
			}
		}
		@keyframes showLayer {
			0% {
				transform: translateY(120%);
			}
			100% {
				transform: translateY(0%);
			}
		}
		@keyframes hideLayer {
			0% {
				transform: translateY(0);
			}
			100% {
				transform: translateY(120%);
			}
		}
	}
	
	/* 规格选择弹窗 */
	.attr-content{
		padding: 10rpx 30rpx;
		.a-t{
			display: flex;
			image{
				width: 170rpx;
				height: 170rpx;
				flex-shrink: 0;
				margin-top: -40rpx;
				border-radius: 8rpx;;
			}
			.right{
				display: flex;
				flex-direction: column;
				padding-left: 24rpx;
				font-size: 32rpx;
				color: #606266;
				line-height: 42rpx;
				.price{
					font-size: 35rpx;
					color: #fa436a;
					margin-bottom: 10rpx;
				}
				.selected-text{
					margin-right: 10rpx;
				}
			}
		}
		.attr-list{
			display: flex;
			flex-direction: column;
			font-size: 35rpx;
			color: #606266;
			padding-top: 30rpx;
			padding-left: 10rpx;
		}
		.item-list{
			padding: 20rpx 0 0;
			display: flex;
			flex-wrap: wrap;
			text{
				display: flex;
				align-items: center;
				justify-content: center;
				background: #eee;
				margin-right: 20rpx;
				margin-bottom: 20rpx;
				border-radius: 100rpx;
				min-width: 60rpx;
				height: 60rpx;
				padding: 0 20rpx;
				font-size: 30rpx;
				color: #303133;
			}
			.selected{
				background: #fbebee;
				color: #fa436a;
			}
		}
	}
	
</style>
