import VueRouter from 'vue-router'
import LoginView from './views/LoginView'
import RegisterView from './views/RegisterView'
import ForgetView from './views/ForgetView'
import IndexView from './views/IndexView'
import IndexDeliveryBody from './components/ErrandComp/IndexDeliveryBody'
import IndexBodyComp from './components/IndexComp/IndexBodyComp'
import IndexStudyBody from './components/StudyComp/IndexStudyBody'
import IndexSecondHandBody from './components/SecondHandComp/IndexSecondHandBody'
import IndexMissAndFindBody from './components/MissAndFindComp/IndexMissAndFindBody'
import IndexSchoolmateBody from './components/SchoolmateComp/IndexSchoolmateBody'
import ErrandPublishData from './components/ErrandComp/ErrandPublishData'
import ErrandComp from './components/ErrandComp/ErrandComp'

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
                    component: IndexDeliveryBody,
                    children: [
                        {
                            path: 'errandPublishData',
                            component: ErrandPublishData
                        },
                        {
                            path: 'errandComp',
                            component: ErrandComp
                        }
                    ]
                },
                {
                    path: 'indexStudyBody',
                    component: IndexStudyBody
                },
                {
                    path: 'indexSecondHandBody',
                    component: IndexSecondHandBody  
                },
                {
                    path: 'indexMissAndFindBody',
                    component: IndexMissAndFindBody
                },
                {
                    path: 'indexSchoolmateBody',
                    component: IndexSchoolmateBody
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