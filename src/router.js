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
import ErrandDetailsComp from './components/ErrandComp/ErrandDetailsComp'
import ErrandChangeComp from './components/ErrandComp/ErrandChangeComp'

import PersonalInfomationComp from '@/components/UserComp/PersonalInfomationComp'
import PersonalInfomationChangeComp from '@/components/UserComp/PersonalInfomationChangeComp'

import StudyPublishData from '@/components/StudyComp/StudyPublishData'
import StudyComp from '@/components/StudyComp/StudyComp'
import StudyDetailsComp from '@/components/StudyComp/StudyDetailsComp'
import StudyChangeComp from '@/components/StudyComp/StudyChangeComp'

import SecondHandPublishData from '@/components/SecondHandComp/SecondHandPublishData'
import SecondHandComp from '@/components/SecondHandComp/SecondHandComp'
import SecondHandDetailsComp from '@/components/SecondHandComp/SecondHandDetailsComp'
import SecondHandChangeComp from '@/components/SecondHandComp/SecondHandChangeComp'

import LostPropertyPublishComp from '@/components/MissAndFindComp/LostPropertyPublishComp'
import LostPropertyComp from '@/components/MissAndFindComp/LostPropertyComp'
import LostPropertyDetailsComp from '@/components/MissAndFindComp/LostPropertyDetailsComp'
import LostPropertyChangeComp from '@/components/MissAndFindComp/LostPropertyChangeComp'

import ManagerIndexView from '@/views/ManagerViews/ManagerIndexView'

import ManagerDeleteComp from '@/components/ManagerComp/ManagerDeleteComp'

// 创建并暴露router实例对象
const router = new VueRouter({
    routes: [
        {
            // 登录界面
            path: '/loginView',
            component: LoginView
        },
        {
            // 注册界面
            path: "/registerView",
            component: RegisterView
        },
        {
            // 忘记密码界面
            path: '/forgetView',
            component: ForgetView
        },
        // 主界面
        {
            // 主界面
            path: '/indexView',
            component: IndexView,
            children: [
                {
                    // 主界面主体
                    path: 'indexBodyComp',
                    component: IndexBodyComp
                },
                {
                    // 跑腿界面
                    path: 'indexDeliveryBody',
                    component: IndexDeliveryBody,
                    children: [
                        {
                            // 跑腿界面发布信息
                            path: 'errandPublishData',
                            component: ErrandPublishData
                        },
                        {
                            // 跑腿界面订单信息
                            path: 'errandComp',
                            component: ErrandComp
                        },
                        {
                            // 跑腿详细信息界面
                            name: 'errandDetails',
                            path: 'errandDetailsComp',
                            component: ErrandDetailsComp
                        },
                        {
                            // 更改跑腿信息
                            path: 'errandChangeComp',
                            component: ErrandChangeComp
                        }
                    ]
                },
                {
                    // 学习界面
                    path: 'indexStudyBody',
                    component: IndexStudyBody,
                    children: [
                        {
                            // 学习发送信息界面
                            path: 'studyPublishData',
                            component: StudyPublishData
                        },
                        {
                            // 学习item界面
                            path: 'studyComp',
                            component: StudyComp
                        },
                        {
                            // 学习界面详细信息界面
                            path: 'studyDetailsComp',
                            component: StudyDetailsComp
                        },
                        {
                            // 学习界面更改信息界面
                            path: 'studyChangeComp',
                            component: StudyChangeComp
                        }
                    ]
                },
                {
                    // 二手交易主体
                    path: 'indexSecondHandBody',
                    component: IndexSecondHandBody,
                    children: [
                        {
                            // 二手交易发布信息界面
                            path:'SecondHandPublishData',
                            component: SecondHandPublishData
                        },
                        {
                            // 二手交易信息预览界面
                            path:'SecondHandComp',
                            component: SecondHandComp
                        },
                        {
                            // 详细信息界面
                            path:'SecondHandDetailsComp',
                            component: SecondHandDetailsComp
                        },
                        {
                            // 修改信息界面
                            path:'SecondHandChangeComp',
                            component: SecondHandChangeComp
                        }
                    ]  
                },
                {
                    // 失物寻找主体
                    path: 'indexMissAndFindBody',
                    component: IndexMissAndFindBody,
                    children:[
                        {
                            // 失物招领发布信息界面
                            path: 'lostPropertyPublishComp',
                            component: LostPropertyPublishComp
                        },
                        {
                            // 失物招领预览界面
                            path: "lostPropertyComp",
                            component: LostPropertyComp
                        },
                        {
                            // 详细信息界面
                            path: "lostPropertyDetailsComp",
                            component: LostPropertyDetailsComp
                        },
                        {
                            // 修改信息界面
                            path: "LostPropertyChangeComp",
                            component: LostPropertyChangeComp
                        }
                    ]
                },
                {
                    // 校友圈主体
                    path: 'indexSchoolmateBody',
                    component: IndexSchoolmateBody
                },
                {
                    // 查看个人信息主体
                    path: 'PersonalInfomationComp',
                    component: PersonalInfomationComp
                },
                {
                    // 修改个人信息
                    path: 'PersonalInfomationChangeComp',
                    component: PersonalInfomationChangeComp
                }
            ]
        },
        // 管理员界面
        {
            path: "/ManagerIndexView",
            component: ManagerIndexView,
            children:[
                {
                    // 删除界面
                    path: "ManagerDeleteComp",
                    component:ManagerDeleteComp
                },
            ]
        }
    ]
})

// 获取Vuex中的用户个人信息
import store from '@/vuex/store'

// 每次路由切换之前被调用 路由前置守卫
router.beforeEach((to, from, next)=>{
    console.log("from: ", from);
    if (to.path == '/loginView' || to.path == '/forgetView' || to.path == '/registerView') {
        next();
    }
    else if(store.state.user.uid == null){
        next('/loginView')
    }
    else{
        next();
    }
})

export default router