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
	import jsondata from '../../../Json.js';
	import {cateList} from "@/api/shop.js";
	
	export default {
		data() {
			return {
				sizeCalcState: false,
				tabScrollTop: 0,
				currentId: 1,
				llist: [],
				rlist: [],
				image_url: ''
			}
		},
		onLoad(){
			this.image_url = 'https://qiniu.wcip.net/';
			this.loadData();//加载分类数据333
		},
		methods: {
			loadData(){
				cateList().then(data => {
					console.log(data,'methods')
					this.llist = data;
				}).catch((e)=> {
					
				})
				
				
				// let list = await this.$api.json('cateList');https://qiniu.wcip.net/upload/goodscate/156706105441827200779.jpg
				// let list = jsondata.cateList;
				// list.forEach(item=>{
				// 	if(!item.pid){
				// 		this.flist.push(item);  //pid为父级id, 没有pid或者pid=0是一级分类
				// 	}else if(!item.picture){
				// 		this.slist.push(item); //没有图的是2级分类
				// 	}else{
				// 		this.tlist.push(item); //3级分类
				// 	}
				// }) 
			},
			//一级分类点击
			tabtap(item){
				this.rlist = item.child;
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
		width: 200upx;
		height: 100%;
		background-color: #fff;
	}
	.f-item {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100upx;
		font-size: 28upx;
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
				height: 36upx;
				width: 8upx;
				background-color: $base-color;
				border-radius: 0 4px 4px 0;
				opacity: .8;
			}
		}
	}

	.right-aside{
		flex: 1;
		overflow: hidden;
		padding-left: 20upx;
	}
	.s-item{
		display: flex;
		align-items: center;
		height: 70upx;
		padding-top: 8upx;
		font-size: 28upx;
		color: $font-color-dark;
	}
	.t-list{
		display: flex;
		flex-wrap: wrap;
		width: 100%;
		background: #fff;
		padding-top: 12upx;
		&:after{
			content: '';
			flex: 99;
			height: 0;
		}
	}
	.t-item{
		flex-shrink: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		width: 176upx;
		font-size: 26upx;
		color: #666;
		padding-bottom: 20upx;
		
		image{
			width: 140upx;
			height: 140upx;
		}
	}
</style>
