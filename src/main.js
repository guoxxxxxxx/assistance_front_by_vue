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

// 引入Element-ui组件库
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// 导入axios异步请求库
import axios from 'axios'
Vue.prototype.axios = axios

// 引入粒子特效
import VueParticles from 'vue-particles'
Vue.use(VueParticles)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router: router
}).$mount('#app')
