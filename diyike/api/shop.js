import config from 'config.js';

// 获取商品分类列表
export function apiCateList(pageNum=1, pageSize=8) {
	return new Promise((resolute, reject)=>{
		try {
			uni.request({
				url: config.api_url + '/app/api/cateList',
				method: 'POST',
				withCredentials: true,
				data: {
					page: pageNum,
					perpage: pageSize
				},
				success: (res) => {
					//接口请求成功
					if(res.data.code == 1) {
						resolute(res.data.data);
					}else {
						console.log(res.data.message);
					}
				},
				fail: (msg) => {
					console.log(msg,'fail -----');
					reject(msg);
				}
			});
		} catch (e) {
			//接口请求失败
			console.log(e,'catch -----');
			reject(e);
		}
	})
}
	
// 获取商品列表
export function apiGoodsList(pageNum, pageSize,conditions={}) {
	return new Promise((resolute, reject)=>{
		try {
			uni.request({
				url: config.api_url + '/app/api/goodsList',
				method: 'POST',
				withCredentials: true,
				data: {
					page: pageNum,
					perpage: pageSize,
					cate_id: conditions.cate_id
				},
				success: (res) => {
					//接口请求成功
					if(res.data.code == 1) {
						resolute(res.data.data);
						//console.log("page.num=" + pageNum + ", page.size=" + pageSize + ", curPageData.length=" + res.data.data.length);
					}else {
						console.log(res.data.message);
					}
				},
				fail: (msg) => {
					console.log(msg,'fail -----');
					reject(msg);
				}
			});
		} catch (e) {
			//接口请求失败
			console.log(e,'catch -----');
			reject(e);
		}
	})
}

// 获取商品列表
export function apiGoodsDetail(goods_id) {
	return new Promise((resolute, reject)=>{
		try {
			uni.request({
				url: config.api_url + '/app/api/goodsDetail',
				method: 'POST',
				withCredentials: true,
				data: {
					goods_id: goods_id				},
				success: (res) => {
					//接口请求成功
					if(res.data.code == 1) {
						resolute(res.data.data);
					}else {
						console.log(res.data.message);
					}
				},
				fail: (msg) => {
					console.log(msg,'fail -----');
					reject(msg);
				}
			});
		} catch (e) {
			//接口请求失败
			console.log(e,'catch -----');
			reject(e);
		}
	})
}


// 获取商品分类列表
export function cateList(pageNum=1, pageSize=8) {
	return new Promise((resolute, reject)=>{
		try {
			uni.request({
				url: 'https://sd.wcip.net/api/test/cateList',
				method: 'POST',
				withCredentials: true,
				data: {
					page: pageNum,
					perpage: pageSize
				},
				success: (res) => {
					//接口请求成功
					if(res.data.code == 1) {
						resolute(res.data.data);
					}else {
						console.log(res.data.message);
					}
				},
				fail: (msg) => {
					console.log(msg,'fail -----');
					reject(msg);
				}
			});
		} catch (e) {
			//接口请求失败
			console.log(e,'catch -----');
			reject(e);
		}
	})
}