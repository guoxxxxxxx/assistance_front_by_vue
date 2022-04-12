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

import SecondHandPublishData from '@/components/SecondHandComp/SecondHandPublishData'

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
                        }
                    ]  
                },
                {
                    // 失物寻找主体
                    path: 'indexMissAndFindBody',
                    component: IndexMissAndFindBody
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
    ]
})

// 获取Vuex中的用户个人信息
import store from '@/vuex/store'

// 每次路由切换之前被调用
router.beforeEach((to, from, next)=>{
    if (to.path == '/loginView' || to.path == '/forgetView' || to.path == '/registerView') {
        console.log('基础界面通过');
        next();
    }
    else if(store.state.user.uid == null){
        console.log('用户未登录,跳转到登录界面');
        next('/loginView')
    }
    else{
        console.log('验证通过');
        next();
    }
})

export default router