import Vue from 'vue'
import App from './App'
import config from 'config.js'

// 注册全局组件
import MescrollBody from "@/components/mescroll-uni/mescroll-body.vue"
import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue"
Vue.component('mescroll-body', MescrollBody)
Vue.component('mescroll-uni', MescrollUni)


Vue.config.productionTip = false
Vue.prototype.config = config;

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
