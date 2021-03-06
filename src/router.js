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

// ???????????????router????????????
const router = new VueRouter({
    routes: [
        {
            // ????????????
            path: '/loginView',
            component: LoginView
        },
        {
            // ????????????
            path: "/registerView",
            component: RegisterView
        },
        {
            // ??????????????????
            path: '/forgetView',
            component: ForgetView
        },
        // ?????????
        {
            // ?????????
            path: '/indexView',
            component: IndexView,
            children: [
                {
                    // ???????????????
                    path: 'indexBodyComp',
                    component: IndexBodyComp
                },
                {
                    // ????????????
                    path: 'indexDeliveryBody',
                    component: IndexDeliveryBody,
                    children: [
                        {
                            // ????????????????????????
                            path: 'errandPublishData',
                            component: ErrandPublishData
                        },
                        {
                            // ????????????????????????
                            path: 'errandComp',
                            component: ErrandComp
                        },
                        {
                            // ????????????????????????
                            name: 'errandDetails',
                            path: 'errandDetailsComp',
                            component: ErrandDetailsComp
                        },
                        {
                            // ??????????????????
                            path: 'errandChangeComp',
                            component: ErrandChangeComp
                        }
                    ]
                },
                {
                    // ????????????
                    path: 'indexStudyBody',
                    component: IndexStudyBody,
                    children: [
                        {
                            // ????????????????????????
                            path: 'studyPublishData',
                            component: StudyPublishData
                        },
                        {
                            // ??????item??????
                            path: 'studyComp',
                            component: StudyComp
                        },
                        {
                            // ??????????????????????????????
                            name: 'studyDetails',
                            path: 'studyDetailsComp',
                            component: StudyDetailsComp
                        },
                        {
                            // ??????????????????????????????
                            path: 'studyChangeComp',
                            component: StudyChangeComp
                        }
                    ]
                },
                {
                    // ??????????????????
                    path: 'indexSecondHandBody',
                    component: IndexSecondHandBody,
                    children: [
                        {
                            // ??????????????????????????????
                            path: 'SecondHandPublishData',
                            component: SecondHandPublishData
                        },
                        {
                            // ??????????????????????????????
                            path: 'SecondHandComp',
                            component: SecondHandComp
                        },
                        {
                            // ??????????????????
                            name: "tradeDetails",
                            path: 'SecondHandDetailsComp',
                            component: SecondHandDetailsComp
                        },
                        {
                            // ??????????????????
                            path: 'SecondHandChangeComp',
                            component: SecondHandChangeComp
                        }
                    ]
                },
                {
                    // ??????????????????
                    path: 'indexMissAndFindBody',
                    component: IndexMissAndFindBody,
                    children: [
                        {
                            // ??????????????????????????????
                            path: 'lostPropertyPublishComp',
                            component: LostPropertyPublishComp
                        },
                        {
                            // ????????????????????????
                            path: "lostPropertyComp",
                            component: LostPropertyComp
                        },
                        {
                            // ??????????????????
                            name: "lostDetails",
                            path: "lostPropertyDetailsComp",
                            component: LostPropertyDetailsComp
                        },
                        {
                            // ??????????????????
                            path: "LostPropertyChangeComp",
                            component: LostPropertyChangeComp
                        }
                    ]
                },
                {
                    // ???????????????
                    path: 'indexSchoolmateBody',
                    component: IndexSchoolmateBody
                },
                {
                    // ????????????????????????
                    path: 'PersonalInfomationComp',
                    component: PersonalInfomationComp
                },
                {
                    // ??????????????????
                    path: 'PersonalInfomationChangeComp',
                    component: PersonalInfomationChangeComp
                }
            ]
        },
        // ???????????????
        {
            path: "/ManagerIndexView",
            component: ManagerIndexView,
            children: [
                {
                    // ????????????
                    path: "ManagerDeleteComp",
                    component: ManagerDeleteComp
                },
            ]
        }
    ]
})

// ??????Vuex????????????????????????
import store from '@/vuex/store'

// ????????????????????????????????? ??????????????????
router.beforeEach((to, from, next) => {
    // ???session?????????????????????
    store.state.user = JSON.parse(sessionStorage.getItem("user"));
    if (to.path == '/loginView' || to.path == '/forgetView' || to.path == '/registerView') {
        next();
    }
    else if (store.state.user == null) {
        next('/loginView')
    }
    else {
        next();
    }
})

export default router