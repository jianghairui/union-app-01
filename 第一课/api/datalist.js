import config from 'config.js';
// 获取新闻列表
export function apiGoodsList(pageNum, pageSize) {
	return new Promise((resolute, reject)=>{
		try {
			uni.request({
				url: config.api_url + '/api/diyike/goodsList',
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
						console.log("page.num=" + pageNum + ", page.size=" + pageSize + ", curPageData.length=" + res.data.data.length);
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