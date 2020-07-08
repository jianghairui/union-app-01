<template>
	<mescroll-body class="content" ref="mescrollRef" @init="mescrollInit" :down="downOption" :up="upOption" @down="downCallback" @up="upCallback">
		<!-- 商品列表 -->
		<view class="goodsBox">
			<view class="goodslist" v-for="(item ,index) in dataList" :key="index">
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
	import {apiGoodsList} from "@/api/shop.js";
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	
	var _self,conditions;
	export default {
		mixins: [MescrollMixin],
		data() {
			return {
				title: '',
				'conditions':{},
				image_url: '',
				downOption: {
					auto: false //是否在初始化后,自动执行downCallback; 默认true
				},
				upOption: {
					auto: true,
					page: {
						size: 10
					}
				},
				dataList: []
			}
		},
		onLoad(e) {
			_self = this;
			_self.image_url = this.config.image_url;
			_self.title = e.cate_name;
			
			// console.log(_self.conditions);
			_self.conditions.cate_id = e.cate_id;
		},
		onReady() {
			uni.setNavigationBarTitle({
				'title' : _self.title
			})
		},
		methods: {
			/*下拉刷新的回调 */
			downCallback() {
				setTimeout(function() {
					_self.dataList = [];
					_self.mescroll.resetUpScroll();
				},1500);
			},
			/*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
			upCallback(page) {
				// console.log(page.num,'---page.num---');
				apiGoodsList(page.num,  page.size, _self.conditions).then(data => {
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

<style lang='scss'>

	page {
		background-color: #f8f8f8;
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
		.goodslist {
			width: 350rpx;
			font-size: 30rpx;
			margin-top: 15rpx;
			border-radius: 10rpx 10rpx;
			overflow: hidden;
			background-color: #ffffff;
			/* background: #00FF00; */
			.image {
				width: 100%;
				height: 350rpx;
			}
			.goods-desc {
				margin : 15rpx 0rpx 15rpx 15rpx ;
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
				view {
					margin-bottom: 15rpx;
				}
			}
		}
	}

</style>