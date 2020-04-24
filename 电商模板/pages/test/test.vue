<template>
	<view class="uni-btn-v uni-common-mt">
		<button type="primary" @click="weixinPay" :loading="loading">微信支付</button>
		<button type="warn" @click="stopZhuan" >停止转动</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'request-payment',
				loading: true
			}
		},
		methods: {
			stopZhuan() {
				this.loading = false;
			},
			weixinPay() {
				console.log("发起支付",'------');
				this.loading = true;
				// uni.login({
				// 	success: (e) => {
				// 		console.log("login success", e);
				// 		uni.request({
				// 			url: `https://unidemo.dcloud.net.cn/payment/wx/mp?code=${e.code}&amount=${this.price}`,
				// 			success: (res) => {
				// 				console.log("pay request success", res);
				// 				if (res.statusCode !== 200) {
				// 					uni.showModal({
				// 						content: "支付失败，请重试！",
				// 						showCancel: false
				// 					});
				// 					return;
				// 				}
				// 				if (res.data.ret === 0) {
				// 					console.log("得到接口prepay_id", res.data.payment);
				// 					let paymentData = res.data.payment;
				// 					uni.requestPayment({
				// 						timeStamp: paymentData.timeStamp,
				// 						nonceStr: paymentData.nonceStr,
				// 						package: paymentData.package,
				// 						signType: 'MD5',
				// 						paySign: paymentData.paySign,
				// 						success: (res) => {
				// 							uni.showToast({
				// 								title: "感谢您的赞助!"
				// 							})
				// 						},
				// 						fail: (res) => {
				// 							uni.showModal({
				// 								content: "支付失败,原因为: " + res
				// 									.errMsg,
				// 								showCancel: false
				// 							})
				// 						},
				// 						complete: () => {
				// 							this.loading = false;
				// 						}
				// 					})
				// 				} else {
				// 					uni.showModal({
				// 						content: res.data.desc,
				// 						showCancel: false
				// 					})
				// 				}
				// 			},
				// 			fail: (e) => {
				// 				console.log("fail", e);
				// 				this.loading = false;
				// 				uni.showModal({
				// 					content: "支付失败,原因为: " + e.errMsg,
				// 					showCancel: false
				// 				})
				// 			}
				// 		})
				// 	},
				// 	fail: (e) => {
				// 		console.log("fail", e);
				// 		this.loading = false;
				// 		uni.showModal({
				// 			content: "支付失败,原因为: " + e.errMsg,
				// 			showCancel: false
				// 		})
				// 	}
				// })
			},
			test(e) {
				// uni.$emit('page-popup', {  
				//     title: '我是title123456',  
				//     content: '我是content'  
				// });
				console.log('start_')
				console.log(e)
				console.log('end_')
				uni.requestPayment({
					
				})
			
			}
		}
	}
</script>

<style>
	button {
		margin-top: 15px;
	}
</style>
