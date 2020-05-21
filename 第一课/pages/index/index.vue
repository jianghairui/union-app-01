<template>
	<view class="content">
		<image class="img" src="/static/op.gif" ></image>
		<view class="text-area">
			<text class="title">{{content1}}</text>
		</view>
		<view>
			<button type="primary" :loading="loading" @click="wxpay">支付测试</button>
		</view>
	</view>
</template>

<script>
	// #ifdef APP-PLUS
	const websiteUrl = 'https://shop.bwg.art';	
	// #endif
	// #ifndef APP-PLUS
	const websiteUrl = '';	
	// #endif
	
	
	export default {
		data() {
			return {
				title: 'Hello',//
				content1: '大风起兮云飞扬,安得猛士兮守四方',
				loading: false,
			}
		},
		onLoad() {
			switch(uni.getSystemInfoSync().platform){
			    case 'android':
			       console.log('运行Android上')
			       break;
			    case 'ios':
			       console.log('运行iOS上')
			       break;
			    default:
			       console.log('运行在开发者工具上')
			       break;
			}
		},
		methods: {
			wxpay(e) {
				uni.request({
				    url: websiteUrl + '/api/diyike/wxpay', //仅为示例，并非真实接口地址。
					method: 'POST',
					withCredentials: true,
				    data: {
				        username: 'uni',
				        password: 'request'
				    },
				    success: (res) => {
				        // console.log(JSON.toString(res.data));
						var orderInfo = JSON.stringify(res.data.data);
						// console.log(orderInfo);
						if(res.data.code == 1) {
							uni.requestPayment({
							    provider: 'wxpay',
							    orderInfo: orderInfo, //微信、支付宝订单数据
							    success: function (res) {
									uni.showModal({
									    content: '支付成功'
									})
							    },
							    fail: function (err) {
									console.log(err)
									// uni.showModal({
									//     content: 'fail:' + JSON.stringify(err)
									// })
							    }
							});
						}else {
							uni.showModal({
							    content: orderInfo
							})
						}
				        
				    },
					fail: (res) => {
						console.log(res)
					}
				});
				
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}
	
	.img {
		width: 750rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
