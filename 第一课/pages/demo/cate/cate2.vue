<template>
	<view class="content">
		<scroll-view scroll-y class="left-aside">
			<view v-for="item in llist" :key="item.id" class="f-item b-b" :class="{active: item.id === currentId}" @click="tabtap(item)">
				{{item.cate_name}}
			</view>
		</scroll-view>
		<scroll-view scroll-with-animation scroll-y class="right-aside" @scroll="asideScroll" :scroll-top="scrollTop">
			<view class="t-list">
				<view @click="navToList(titem.id)" class="t-item" v-for="titem in rlist" :key="titem.id">
					<image :src="image_url + titem.pic"></image>
					<text>{{titem.name}}</text>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import {apiCateList,apiGoodsList} from "@/api/shop.js";
	
	export default {
		data() {
			return {
				sizeCalcState: false,
				loading: false,
				scrollTop: 0,
				old_scrollTop: 0,
				currentId: 0,
				llist: [],
				rlist: [],
				image_url: ''
			}
		},
		onLoad(){
			// this.image_url = 'https://qiniu.sd.wcip.net/';
			this.image_url = this.config.image_url;
			this.getCateList();//加载分类数据333
		},
		methods: {
			getCateList() {
				apiCateList(1,50).then(data => {
					// console.log(data,'getCateList');
					if(data.length > 0) {
						var conditions = {
							cate_id: data[0].id
						};
						this.getGoodsList(conditions);
					}
					this.llist = data;
					this.currentId = data[0].id;
				}).catch((e)=> {
					
				})
			},
			getGoodsList(conditions) {
				apiGoodsList(1,50,conditions).then(data => {
					// console.log(data,'getGoodsList');
					this.rlist = data;
					this.scrollTop = this.old_scrollTop;
					this.$nextTick(function() {
						this.scrollTop = 0;
					});
					this.loading = false;
				}).catch((e)=> {
					
				})
			},
			//一级分类点击
			tabtap(item){
				if(!this.loading) {
					this.loading = true;
					this.currentId = item.id;
					var conditions = {
						cate_id: item.id
					};
					this.getGoodsList(conditions);
				}
			},
			//右侧栏滚动
			asideScroll(e){
				this.old_scrollTop = e.detail.scrollTop
			},
			navToList(goods_id){
				uni.navigateTo({
					url: '/pages/demo/goods-detail/goods-detail?goods_id=' + goods_id
				})
			}
		}
	}
</script>

<style lang='scss'>
	page,
	.content {
		height: 100%;
		background-color: #f8f8f8;
	}

	.content {
		display: flex;
	}
	.left-aside {
		flex-shrink: 0;
		width: 200rpx;
		height: 100%;
		background-color: #fff;
	}
	.f-item {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100rpx;
		font-size: 28rpx;
		color: $font-color-base;
		position: relative;
		&.active{
			color: $base-color;
			background: #f8f8f8;
			&:before{
				content: '';
				position: absolute;
				left: 0;
				top: 50%;
				transform: translateY(-50%);
				height: 36rpx;
				width: 8rpx;
				background-color: $base-color;
				border-radius: 0 4px 4px 0;
				opacity: 0.8;
			}
		}
	}

	.right-aside{
		flex: 1;
		padding-left:20rpx;
	}
	
	.t-list{
		display: flex;
		flex-wrap: wrap;
		background: #fff;
		padding-top: 12rpx;
	}
	.t-item{
		flex-shrink: 0;
		/* flex: 1; */
		width: 50%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		font-size: 26rpx;
		color: #666;
		padding-bottom: 20rpx;
		image{
			width: 225rpx;
			height: 225rpx;
			border-radius: 10rpx;
			margin-bottom: 10rpx;
		}
		text {
			text-align: center;
			width: 230rpx;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}
	}
</style>
