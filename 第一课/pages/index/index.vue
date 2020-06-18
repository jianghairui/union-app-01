<template>
	<view class="content">
		<view class="nav">
			<view v-for="(item, index) in menu" class="menu" :class="[activeIndex == index ? 'menuActive' : '']" @click="menuSelect" :key="index" :id="'menu_'+index">
				{{item}}
			</view>
		</view>
		<view class="menulist">
			<navigator url="/pages/list/list?title=navigate" hover-class="navigator-hover">
				<button type="default">上载下拉</button>
			</navigator>
			<view>
				<button type="default" @click="sendSms" :disabled="disabled">{{content}}</button>
			</view>
			<view>
				<button type="primary" :loading="loading" @click="wxpay">支付测试..</button>
			</view>
			<view style="width: 750rpx;height: 400rpx;background: #AAAAAA;" @click="viewOutside">
				outside
				<view style="width: 450rpx;height: 300rpx;background: #AA8E8E;" @click.stop="viewInside">
					inside(防止冒泡+.stop)
				</view>
			</view>
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

	const init_seconds = 10;
	var _self,isclick = true;

	export default {
		data() {
			return {
				activeIndex: 0,//
				menu: [
					'新闻','生活','体育','政治','娱乐'
				],
				loading: false,
				disabled: false,
				second: init_seconds,
				content: '点击发送短信'
			}
		},
		
		onLoad(param) {
			_self = this;
			console.log(param);
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
						console.log(orderInfo);
						// return;
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
									console.log(err);
									uni.showModal({
									    content: 'fail:' + JSON.stringify(err)
									})
							    }
							});
						}else {
							uni.showModal({
							    content: orderInfo
							})
						}
				        
				    }
				});
				
			},
			sendSms(e) {
				_self.disabled = true;
				
				var counter = setInterval(function() {
					if(_self.second > 1) {
						_self.second--;
						_self.content = _self.second + 's后重新发送';
					}else {
						_self.content = '点击发送短信';
						_self.second = init_seconds;
						clearInterval(counter);
						_self.disabled = false;
					}
				},1000);
			},
			menuSelect: function(e) {
				var menu_id = e.target.id;
				// console.log('tap ' + menu_id);
				_self.activeIndex = menu_id.substr(5);
			},
			viewInside: function(e) {
				console.log('inside')
			},
			viewOutside: function(e) {
				console.log('outside')
			}
		},
		onHide() {
			// console.log('隐藏首页');
			// switch(uni.getSystemInfoSync().platform){
			//     case 'android':
			//        console.log('运行Android上')
			//        break;
			//     case 'ios':
			//        console.log('运行iOS上')
			//        break;
			//     default:
			//        console.log('运行在开发者工具上')
			//        break;
			// }
		},
		onShow() {
			// console.log('显示首页');
		}
	}
</script>

<style>
	
	button { width: 375rpx;margin-bottom: 15rpx; }
	
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;//
		flex-wrap: wrap;
	}
	.nav {
		margin-bottom: 15rpx;
	}
	
	.menu { font-size: 50rpx;padding: 10rpx;float: left;line-height: 100rpx;  }
	.menuActive { color:#FF0000;font-size: 55rpx; }

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
	
	
</style>
