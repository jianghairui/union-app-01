import config from 'config.js';

// 获取轮播图列表
export function apiSlideList(pageNum=1, pageSize=10) {
	return new Promise((resolute, reject)=>{
		try {
			uni.request({
				url: config.api_url + '/app/api/slideList',
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
