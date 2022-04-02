import Vue from 'vue'
import App from './App.vue'

// 导入路由组件
import VueRouter from 'vue-router'
import router from './router'
Vue.use(VueRouter)

// 导入AOS动画库
import AOS from "aos";
import "../node_modules/aos/dist/aos.css";
Vue.use(AOS);
AOS.init()



Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router: router
}).$mount('#app')
