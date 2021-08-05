import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import FastClick from 'fastclick'    //首先先下载，然后导入，在次后挂在使用
import VueLazyLoad from 'vue-lazyload'  //下载  导入  use挂在调用install函数  在img标签上将src改为v-lazy  可以使用require导入默认图片

import toast from 'components/common/toast' // 1.引入插件 2.use装载 3.自动调用index.js中的install函数(这个函数需要手动完成)
                                            // 4.像使用bus那样使用 this.$toast
Vue.config.productionTip = false
Vue.prototype.$bus = new Vue() // 将vue实例作为事件总线，监听不同组件间事件变化，使得组件间通信

// 2.安装插件,就相当于调用了toast的install函数方法
Vue.use(toast) 
Vue.use(VueLazyLoad, {
  loading: require('./assets/img/common/placeholder.png')   //
})

// 解决移动端300ms延迟
FastClick.attach(document.body)
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
// $mount 将vue实例挂载到app上

// import { createApp } from 'vue'
// createApp(App).use(router).use(store).use(VueLazyLoad, {
//   loading: require('./assets/img/common/placeholder.png')
// }).mount('#app')