
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/demo/index/index","pages/demo/cate/cate","pages/demo/cate/cate2","pages/demo/cart/cart","pages/demo/my/my","pages/demo/mynote/mynote","pages/demo/goods-detail/goods-detail","pages/demo/create-order/create-order","pages/demo/address/address","pages/demo/goods-list/goods-list","pages/demo/pay/pay","pages/demo/list/list","pages/demo/video/video","pages/demo/login/login","pages/demo/test/test","pages/demo/slide/slide","pages/demo/map/map"],"window":{"navigationBarTextStyle":"black","navigationBarTitleText":"uni-app","navigationBarBackgroundColor":"#F8F8F8","backgroundColor":"#F8F8F8"},"tabBar":{"color":"#7A7E83","selectedColor":"#1296DB","borderStyle":"black","backgroundColor":"#ffffff","list":[{"pagePath":"pages/demo/index/index","iconPath":"static/tabbar/index0.png","selectedIconPath":"static/tabbar/index1.png","text":"首页"},{"pagePath":"pages/demo/cate/cate2","iconPath":"static/tabbar/cate0.png","selectedIconPath":"static/tabbar/cate1.png","text":"分类"},{"pagePath":"pages/demo/cart/cart","iconPath":"static/tabbar/cart0.png","selectedIconPath":"static/tabbar/cart1.png","text":"购物车"},{"pagePath":"pages/demo/my/my","iconPath":"static/tabbar/my0.png","selectedIconPath":"static/tabbar/my1.png","text":"我的"}]},"nvueCompiler":"uni-app","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"第一课","compilerVersion":"2.7.14","entryPagePath":"pages/demo/index/index","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/demo/index/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"博物馆商店"}},{"path":"/pages/demo/cate/cate","meta":{},"window":{"navigationBarTitleText":"分类"}},{"path":"/pages/demo/cate/cate2","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"分类"}},{"path":"/pages/demo/cart/cart","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"购物车"}},{"path":"/pages/demo/my/my","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"我的"}},{"path":"/pages/demo/mynote/mynote","meta":{},"window":{"navigationBarTitleText":"lessons"}},{"path":"/pages/demo/goods-detail/goods-detail","meta":{},"window":{"navigationBarTitleText":"商品详情"}},{"path":"/pages/demo/create-order/create-order","meta":{},"window":{"navigationBarTitleText":"创建订单"}},{"path":"/pages/demo/address/address","meta":{},"window":{"navigationBarTitleText":"收货地址"}},{"path":"/pages/demo/goods-list/goods-list","meta":{},"window":{"navigationBarTitleText":""}},{"path":"/pages/demo/pay/pay","meta":{},"window":{"navigationBarTitleText":"lesson 1"}},{"path":"/pages/demo/list/list","meta":{},"window":{"navigationBarTitleText":"商品列表","animationType":"fade-in"}},{"path":"/pages/demo/video/video","meta":{},"window":{"navigationBarTitleText":"lesson 3","animationType":"fade-in","subNVues":[{"id":"popup","path":"pages/demo/video/subnvue/popup","style":{"position":"absolute","dock":"right","width":"100upx","height":"150upx","background":"transparent"}}]}},{"path":"/pages/demo/login/login","meta":{},"window":{"navigationBarTitleText":"账号登录","animationType":"fade-in","subNVues":[{"id":"popup","path":"pages/demo/login/subnvue/popup","style":{"position":"absolute","dock":"right","width":"100upx","height":"150upx","background":"transparent"}}]}},{"path":"/pages/demo/test/test","meta":{},"window":{"navigationBarTitleText":"测试页"}},{"path":"/pages/demo/slide/slide","meta":{},"window":{"navigationBarTitleText":"分类"}},{"path":"/pages/demo/map/map","meta":{"isNVue":true},"window":{"navigationBarTitleText":"地图"}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});
