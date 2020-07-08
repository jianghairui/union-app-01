<template>
	<mescroll-body class="content" ref="mescrollRef" @init="mescrollInit" :down="downOption" :up="upOption" @down="downCallback" @up="upCallback">
		<view class="notice">
			<text>好货精选</text>
		</view>
		<view class="goodsBox">
			<view class="goodslist" v-for="(item ,index) in dataList" :key="index">
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
			</view>
		</view>
	</mescroll-body>
</template>

<script>
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	import {apiGoodsList} from "@/api/datalist.js"
	var _self;
	
	export default {
		mixins: [MescrollMixin], // 使用mixin (在main.js注册全局组件)
		data() {
			return {
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
			_self.image_url = this.config.image_url;//
			// console.log(this.config.api_url);
		},
		methods: {
			/*下拉刷新的回调 */
			downCallback() {
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
			},
			getnewsList(page=1,perpage=10,datalist=[]) { 
				uni.request({
					url: this.config.api_url + '/app/api/goodsList',
					method: 'POST',
					withCredentials: true,
					data: {
						page: page,
						perpage: perpage
					},
					success: (res) => {
						this.dataList = datalist.concat(res.data.data);
						this.mescroll.endSuccess(res.data.data.length);
					},
					fail: (msg) => {
						console.log(msg)
					}
				});
			}
		}
	}
</script>

<style>
	
	page {
		background-color: #f8f8f8;
	}
	
	.content {
		/* #ifndef APP-PLUS-NVUE */
		display: flex;
		/* #endif */
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
		background-color: #FFFFFF;
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
