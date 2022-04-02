import VueRouter from 'vue-router'
import LoginView from './views/LoginView'


// 创建并暴露router实例对象
export default new VueRouter({
    routes:[
        {
            path:'/loginView',
            component: LoginView
        }
    ]
})