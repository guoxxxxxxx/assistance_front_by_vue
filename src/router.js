import VueRouter from 'vue-router'
import LoginView from './views/LoginView'
import RegisterView from './views/RegisterView'
import ForgetView from './views/ForgetView'
import IndexView from './views/IndexView'
import IndexDeliveryBody from './components/IndexDeliveryComp/IndexDeliveryBody'
import IndexBodyComp from './components/IndexComp/IndexBodyComp'
import IndexStudyBody from './components/IndexStudyComp/IndexStudyBody'

// 创建并暴露router实例对象
const router = new VueRouter({
    routes: [
        {
            path: '/loginView',
            component: LoginView
        },
        {
            path: "/registerView",
            component: RegisterView
        },
        {
            path: '/forgetView',
            component: ForgetView
        },
        {
            path: '/indexView',
            component: IndexView,
            children: [
                {
                    path: 'indexBodyComp',
                    component: IndexBodyComp
                },
                {
                    path: 'indexDeliveryBody',
                    component: IndexDeliveryBody
                },
                {
                    path: 'indexStudyBody',
                    component: IndexStudyBody
                }
            ]
        },
    ]
})

// // 每次路由切换之前被调用
// router.beforeEach((to, from, next)=>{
//     // to 到哪里去
//     // from 从哪里来
//     // next() 允许通过
//     console.log(to, from, next)
//     next()
// })

export default router