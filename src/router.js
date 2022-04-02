import VueRouter from 'vue-router'
import LoginView from './views/LoginView'
import RegisterView from './views/RegisterView'


// 创建并暴露router实例对象
export default new VueRouter({
    routes:[
        {
            path:'/loginView',
            component: LoginView
        },
        {
            path:"/registerView",
            component: RegisterView
        }
    ]
})