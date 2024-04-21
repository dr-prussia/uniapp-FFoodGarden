
// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import store from './store/store.js'

import $http from '@escook/request-miniprogram'
Vue.config.productionTip = false
App.mpType = 'app'

Vue.prototype.$http = $http // 将 $http 挂载到 Vue 实例上

$http.baseUrl = 'https://api-hmugo-web.itheima.net' // 配置请求根路径

$http.beforeRequest = function(options) { // 请求拦截器
  uni.showLoading({
    title: '数据加载中...'
  })
}

$http.afterRequest = function() { // 响应拦截器
  uni.hideLoading()
}

const app = new Vue({
  ...App,
  store,
})
app.$mount()
// #endif


// #ifdef VUE3
import { createApp } from 'vue'
import App from './App.vue'
import store from './store/store.js'
import { $http } from '@escook/request-miniprogram'

const app = createApp(App)

app.use(store)

// 将 $http 挂载到 app.config.globalProperties 上，这样在组件中就可以通过 this.$http 使用了
uni.$http = $http

// 配置请求根路径
$http.baseUrl = 'https://api-hmugo-web.itheima.net'

// 请求拦截器
$http.beforeRequest = function(options) {
  uni.showLoading({
    title: '数据加载中...'
  })
}

// 响应拦截器
$http.afterRequest = function() {
  uni.hideLoading()
}

//封装弹窗的方法
uni.$showMsg = function(title = '数据请求失败！', duration = 1500) {
  uni.showToast({
    title,
    duration,
    icon:'none'
  })
}

app.mount('#app')
// #endif





