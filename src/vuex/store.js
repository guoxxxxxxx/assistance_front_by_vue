// 该文件用于创建Vuex中的store
// 引入Vuex
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        // 要设置的全局访问的State对象
        // 要设置的初始属性值
        user:{
            uid: '',
            name: '',
            sex: '',
            birthday: '',
            phone: '',
            faculty: '',
            grade: '',
            major: '',
            email: '',
            wechat: '',
            qq: '',
            avatarPath: '',
        }
    },
    getters:{
        // 实时监听state值的变化(最新状态)
        getUserInfo(state){
            return state.user;
        },
        // 获取用户头像路径
        getUserAvatar(state){
            return state.getUserAvatar
        }
    },
    mutations:{
        // 更新用户信息
        updateUserInfo(state, user){
            state.user = user;
        },
        // 更新用户头像信息
        updateUserAvatar(state, avatarPath){
            state.user.avatarPath = avatarPath;
        }
    }
})
