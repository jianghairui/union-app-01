<template>
	<view class="container">
		<view style="background:#FFF; padding:20rpx;">
			<rich-text :nodes="htmlNodes"></rich-text>
		</view>
	</view>
</template>

<script>
	
	import htmlParser from '@/common/html-parser.js';
	import {apiGoodsDetail} from "@/api/shop.js";
	export default {
		
		data() {
			return {
				htmlNodes : [],
				strings: '<div style="text-align:center;"><img src="https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png"/></div>'
			}
		},
		onLoad(e) {
			console.log(e)
			this.htmlNodes = htmlParser(this.strings)
		},
		methods: {
			
		}
		
	}
	
	
</script>

<style>
</style>
