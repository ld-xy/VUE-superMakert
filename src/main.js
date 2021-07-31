import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

//事件总线，必须有这一步，不然bus内没有值，不能起到中转作业
//子辈组件this.$bus.$emit(“事件”)抛出事件到bus，在父辈或者祖辈组件中this.$bus.on("监听事件")
Vue.prototype.$bus = new Vue()

new Vue({
  render: h => h(App),
  router
}).$mount('#app')


