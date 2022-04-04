import VueRouter from 'vue-router'
import LoginView from './views/LoginView'
import RegisterView from './views/RegisterView'
import ForgetView from './views/ForgetView'
import IndexView from './views/IndexView'


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
        },
        {
            path:'/forgetView',
            component: ForgetView
        },
        {
            path:'/indexView',
            component: IndexView
        }
    ]
})