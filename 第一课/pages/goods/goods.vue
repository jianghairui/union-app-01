<template>
	<view class="content">
		<view class="newslist" v-for="(item ,index) in newsList">
			<image class="image" :src="pic_domain+item.pic" mode="aspectFill" />
			<view class="title">{{item.name}}</view>
			<view class="price">￥：{{item.price}}</view>
		</view>
	</view>
</template>
<script>
	const pic_domain = 'https://shop.bwg.art/';
	var _self,
		page = 1,
		timer = null;
	// 定义全局参数,控制数据加载

	export default {
		data() {
			return {
				newsList: [],
				pic_domain: pic_domain,
				loadingText: '加载中...',
				loadingType: 0, //定义加载方式 0---contentdown  1---contentrefresh 2---contentnomore
				contentText: {
					contentdown: '上拉显示更多',
					contentrefresh: '正在加载...',
					contentnomore: '没有更多数据了'
				}
			}
		},
		onLoad() {
			_self = this;
			this.getnewsList();
			console.log(this.config.jash)
		},
		onPullDownRefresh: function() {
			//下拉刷新的时候请求一次数据
			this.getnewsList();
		},
		onReachBottom: function() {
			//触底的时候请求数据，即为上拉加载更多
			//为了更加清楚的看到效果，添加了定时器
			if (timer != null) {
				clearTimeout(timer);
			}
			timer = setTimeout(function() {
				_self.getmorenews();
			}, 1000);
			// 正常应为:
			// _self.getmorenews();
		},
		methods: {
			getnewsList(e) { //第一次回去数据
				page = 1;
				uni.request({
					url: 'https://shop.bwg.art/pc/test/goodsList',
					method: 'POST',
					withCredentials: true,
					data: {
						page: page,
						perpage: 10
					},
					success: (res) => {
						// var orderInfo = JSON.stringify(res.data.data);
						// console.log(res);
						// return;
						// page++;//得到数据之后page+1
						_self.newsList = res.data.data;
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
	.content {
		/* #ifndef APP-PLUS-NVUE */
		display: flex;
		/* #endif */
		/* flex-direction: column; */
		flex-wrap: wrap;
		/* align-items: center; */
		/* justify-content: center; */
	}

	.newslist {
		width: 360rpx;
		font-size: 30rpx;
		margin-top: 10rpx;
		margin-left: 10rpx;
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

	.price {
		color: red;
	}

	.image {
		width: 360rpx;
		height: 360rpx;
	}
</style>
