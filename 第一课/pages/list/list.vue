<template>
	<mescroll-body ref="mescrollRef" @init="mescrollInit" :down="downOption" @down="downCallback" @up="upCallback">
		<!-- <view class="notice">本Demo的下拉刷新: 添加新数据到列表顶部</view> -->
		<view class="content">
			<view class="newslist" v-for="(item ,index) in dataList" :key="index">
				<image class="image" :src="image_url+item.pic" mode="aspectFill" />
				<view class="title">{{item.name}}</view>
				<view class="price">￥：{{item.price}}</view>
			</view>
		</view>
	</mescroll-body>
</template>

<script>
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	
	var _self;
	// #ifdef APP-PLUS
	const websiteUrl = 'https://shop.bwg.art';
	// #endif
	// #ifndef APP-PLUS
	const websiteUrl = '';
	// #endif
	
	export default {
		mixins: [MescrollMixin], // 使用mixin (在main.js注册全局组件)
		data() {
			return {
				downOption: {
					auto: false //是否在初始化后,自动执行downCallback; 默认true
				},
				image_url: '',
				dataList: []
			}
		},
		onLoad(e) {
			_self = this;
			_self.image_url = this.config.image_url;
			console.log(this.config.api_url);
		},
		methods: {
			/*下拉刷新的回调 */
			downCallback() {
				//联网加载数据
				setTimeout(function() {
					console.log('数据获取成功')
					// this.dataList.unshift(data[0]);
					// this.mescroll.endSuccess();
				},1000);
			
			},
			/*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
			upCallback(page) {
				this.getnewsList(page.num, page.size);
//				this.mescroll.endBySize(curPageData.length, totalSize); //必传参数(当前页的数据个数, 总数据量)
				
			},
			getnewsList(page,perpage) { //第一次回去数据
				if(!page) { page = 1 }
				if(!perpage) { perpage = 10 }
				uni.request({
					url: websiteUrl + '/api/diyike/goodsList',
					method: 'POST',
					withCredentials: true,
					data: {
						page: page,
						perpage: perpage
					},
					success: (res) => {
						this.dataList=this.dataList.concat(res.data.data);
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
	/*说明*/
	.notice{
		font-size: 30upx;
		padding: 40upx 0;
		border-bottom: 1upx solid #eee;
		text-align: center;
	}
	
	.content {
		display: flex;
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
