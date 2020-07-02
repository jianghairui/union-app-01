<template>
	<mescroll-body class="content" ref="mescrollRef" @init="mescrollInit" :down="downOption" :up="upOption" @down="downCallback" @up="upCallback">
		<view class="container">
			<!-- 轮播图 -->
			<uni-swiper-dot :info="slide" :current="current" mode="default" field="content">
				<swiper class="swiper-box" @change="change" :autoplay="autoplay" :duration="duration" :interval="interval">
					<swiper-item v-for="(item, index) in slide" :key="index">
						<navigator :url="item.url" hover-class="none">
							<view class="swiper-item">
								<image class="slide" :src="image_url+item.pic" mode="aspectFill" />
							</view>
						</navigator>
					</swiper-item>
				</swiper>
			</uni-swiper-dot>
			<!-- 商品分类 -->
			<view class="catebox">
				<view class="catelist" v-for="(item,index) in cateList" :key="'cate'+index">
					<navigator :url="'/pages/demo/goods-list/goods-list?cate_id='+item.id+'&cate_name='+item.cate_name" hover-class="none">
					<view>
						<image :src="image_url+item.icon"></image>
					</view>
					<view>
						<text>{{item.cate_name}}</text>
					</view>
					</navigator>
				</view>
			</view>
		</view>
		
		<view class="notice">
			<text>好货精选</text>
		</view>
		<!-- 商品列表 -->
		<view class="goodsBox">
			<view class="goodslist" v-for="(item ,index) in dataList" :key="'goodslist'+index">
				<navigator :url="'/pages/demo/goods-detail/goods-detail?goods_id='+item.id" hover-class="none">
				<image class="image" :src="image_url+item.pic" mode="aspectFill" />
				<view class="goods-desc">
					<view class="title">{{item.name}}</view>
					<view>
						<text class="museum">
							{{item.museum_name}}
						</text>
					</view>
					<view>
						￥ <text class="price">{{item.price}}</text>
					</view>
				</view>
				</navigator>
			</view>
		</view>
	</mescroll-body>
</template>

<script>
	import uniSection from '@/components/uni-section/uni-section.vue';
	import uniSwiperDot from '@/components/uni-swiper-dot/uni-swiper-dot.vue';
	import {apiSlideList} from "@/api/datalist.js";
	import {apiCateList,apiGoodsList} from "@/api/shop.js";
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	
	var _self;
	export default {
		mixins: [MescrollMixin],
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
				cateList: [],
				downOption: {
					auto: false //是否在初始化后,自动执行downCallback; 默认true
				},
				upOption: {
					auto: true,
					page: {
						num: 0,
						size: 10
					}
				},
				image_url: '',
				dataList: []
			}
		},
		onLoad(e) {
			_self = this;
			_self.image_url = this.config.image_url;
			this.getSlideList();
			this.getCateList();
		},
		methods: {
			change(e) {
				this.current = e.detail.current
				// console.log(e)
			},
			getSlideList() {
				// console.log(page);
				apiSlideList().then(data => {
					//设置列表数据
					this.slide = data;
				}).catch((e)=>{
					//接口失败的回调,隐藏下拉刷新的状态.
				})
			},
			getCateList() {
				// console.log(page);
				apiCateList().then(data => {
					//设置列表数据
					this.cateList = data;
				}).catch((e)=>{
					//接口失败的回调,隐藏下拉刷新的状态.
				})
			},
			/*下拉刷新的回调 */
			downCallback() {
				this.getSlideList();
				this.getCateList();
				this.dataList = [];
				this.mescroll.resetUpScroll();
			},
			/*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
			upCallback(page) {
				// console.log(page);
				apiGoodsList(page.num,  page.size).then(data => {
					//成功的回调,隐藏下拉刷新的状态
					this.mescroll.endSuccess(data.length);
					//设置列表数据
					this.dataList = this.dataList.concat(data);
				}).catch((e)=>{
					//接口失败的回调,隐藏下拉刷新的状态.
					this.mescroll.endErr();
				})
			}
		}
	}
</script>

<style>

	page {
		background-color: #f8f8f8;
	}
	
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

	.slide {
		width: 750rpx;
		height: 750rpx;
	}
	
	.catebox {
		margin: 30rpx 15rpx 20rpx 15rpx;
		display: flex;
		flex-wrap: wrap;
		/* justify-content: space-around; */
	}

	.catelist {
		width: 25%;
		text-align: center;
		margin-bottom: 15rpx;
	}
	
	.catelist image {
		width: 100rpx;
		height: 100rpx;
	}
	
	.catelist text {
		font-size: 25rpx;
	}
	
	/*说明*/
	.notice{
		font-size: 30rpx;
		padding: 40rpx 0;
		border-bottom: 1rpx solid #eee;
		text-align: center;
	}
	
	.goodsBox {
		/* #ifndef APP-PLUS-NVUE */
		display: flex;
		/* #endif */
		/* flex-direction: column; */
		flex-wrap: wrap;
		justify-content: space-between;
		width: 720rpx;
		margin-left: 15rpx;
	}
	
	.goodslist {
		width: 350rpx;
		font-size: 30rpx;
		margin-top: 15rpx;
		border-radius: 10rpx 10rpx;
		overflow: hidden;
		background-color: #ffffff;
		/* background: #00FF00; */
	}
	
	.goods-desc {
		margin : 15rpx 0rpx 15rpx 15rpx ;
	}
	
	.goods-desc view {
		margin-bottom: 15rpx;
	}
	
	.title {
		/* height: 80rpx; */
		/* overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis; */
		width: 100%;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
	}
	
	.museum {
		background-color: #FF5A5F;
		font-size: 24rpx;
		color: #FFFFFF;
		text-align: center;
		padding: 5rpx 15rpx 5rpx 15rpx;
	}
	
	.price {
		font-size: 36rpx;
		color: rgba(255,0,0,0.7);
	}
	
	.image {
		width: 100%;
		height: 350rpx;
	}
	

</style>