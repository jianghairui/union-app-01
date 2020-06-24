<template>
	<view class="content">
		<video src="https://qiniu.bwg.art/uni/video/demo.mp4" autoplay="true">视频啊</video>
		<view class="body-box">
				<view class="title">
					<text>按钮、选择器组件</text>
				</view>
				<view>
					<checkbox-group @change="checkboxChange" class="uni-list">
						<label class="uni-list-cell" v-for="item in items" :key="item.value">
							<view>
								<checkbox :value="item.value" :checked="item.checked" />{{item.name}}
							</view>
						</label>
					</checkbox-group>
				</view>
				<view class="uni-list">
					<view class="font-l">
						日期选择器: 
					</view>
					<view class="font-l select">
						<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
							<view class="uni-input">{{date}}</view>
						</picker>
					</view>
				</view>
				<view class="uni-list">
					<view class="switch-box">
						<view class="switch-text">开启中</view>
						<switch checked />
					</view>
					<view class="switch-box">
						<view class="switch-text">关闭</view>
						<switch />
					</view>
				</view>
			</view>
		</view>
</template>
<script>
	
	var _self;
	// 定义全局参数,控制数据加载...

	export default {
		
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				title: 'checkbox 复选框',
				items: [{
						value: 'USA',
						name: '美国'
					},
					{
						value: 'CHN',
						name: '中国',
						checked: 'true'
					},
					{
						value: 'BRA',
						name: '巴西'
					},
					{
						value: 'JPN',
						name: '日本'
					},
					{
						value: 'ENG',
						name: '英国'
					},
					{
						value: 'FRA',
						name: '法国'
					}
				],
				index: 0,
				date: currentDate,
				time: '12:01'
			}
		},
		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},
		onLoad() {
			_self = this;
		},
		
		methods: {
			checkboxChange: function (e) {
				var items = this.items,
					values = e.detail.value;
				for (var i = 0, lenI = items.length; i < lenI; ++i) {
					const item = items[i]
					if(values.includes(item.value)){
						this.$set(item,'checked',true)
					}else{
						this.$set(item,'checked',false)
					}
				}
			},
			bindDateChange: function(e) {
				this.date = e.target.value
			},
			bindTimeChange: function(e) {
				this.time = e.target.value
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
	
				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			}
		}
	}
</script>

<style>
	.content {
		/* #ifndef APP-PLUS-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
	}
	
	video{
		position: fixed;
		right:0;
		bottom: 0;
		min-width: 100%;
		min-height: 100%;
		width: auto;
		height: auto;
		z-index: -9;
		/*灰色调*/
		/*-webkit-filter:grayscale(100%)*/
	}
	
	.body-box {
		background: #FFFFFF;
	}
	
	.title {
		text-align: center;
	}
	
	.uni-list {
		/* #ifndef APP-PLUS-NVUE */
		display: flex;
		/* #endif */
		flex-wrap: wrap;
		margin-bottom: 15rpx;
	}
	
	.uni-list-cell {
		width: 250rpx;
		margin-bottom: 15rpx;
	}
	
	.font-l {
		font-size: 40rpx;
	}
	
	.select {
		color: #FF0000;
	}
	
	.switch-box { 
		width: 750rpx;
		height: 70rpx;
		background-color: #C0C0C0;
		margin-bottom: 15rpx;
	}
	
	.switch-text {
		display: block;
		float: left;
		line-height: 70rpx;
	}
	
	.switch-box switch {
		display: block;
		float: right;
	}
	
	
	


</style>
