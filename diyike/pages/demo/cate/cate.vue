<template>
	<view class="content">
		<scroll-view scroll-y class="left-aside">
			<view v-for="item in llist" :key="item.id" class="f-item b-b" :class="{active: item.id === currentId}" @click="tabtap(item)">
				{{item.cate_name}}
			</view>
		</scroll-view>
		<scroll-view scroll-with-animation scroll-y class="right-aside" @scroll="asideScroll" :scroll-top="tabScrollTop">
			<view class="t-list">
				<view @click="navToList(item.id, titem.id)" class="t-item" v-for="titem in rlist" :key="titem.id">
					<image :src="image_url + titem.icon"></image>
					<text>{{titem.cate_name}}</text>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import {cateList} from "@/api/shop.js";
	
	export default {
		data() {
			return {
				sizeCalcState: false,
				tabScrollTop: 0,
				currentId: 0,
				llist: [],
				rlist: [],
				image_url: ''
			}
		},
		onLoad(){
			this.image_url = 'https://qiniu.sd.wcip.net/';
			this.loadData();//加载分类数据333
		},
		methods: {
			loadData(){
				cateList().then(data => {
					// console.log(data,'methods')
					this.llist = data;
					this.rlist = data[0].child;
					this.currentId = data[0].id;
				}).catch((e)=> {
					
				})
			},
			//一级分类点击
			tabtap(item){
				this.rlist = item.child;
				this.currentId = item.id;
			},
			//右侧栏滚动
			asideScroll(e){
				
			},
			navToList(sid, tid){
				uni.navigateTo({
					url: `/pages/product/list?fid=${this.currentId}&sid=${sid}&tid=${tid}`
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
		width: 33.33%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		font-size: 26rpx;
		color: #666;
		padding-bottom: 20rpx;
		image{
			width: 140rpx;
			height: 140rpx;
		}
		text {
			text-align: center;
			width: 150rpx;
			white-space: nowrap;
			overflow: hidden;
		}
	}
</style>
