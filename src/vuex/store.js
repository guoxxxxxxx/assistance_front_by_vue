// 该文件用于创建Vuex中的store
// 引入Vuex
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        // 要设置的全局访问的State对象
        // 要设置的初始属性值
        user:{},

        // 设置errand的过滤属性
        // 0代表不过滤 1 代表过滤
        errandFilterType:{
            category:"all",             // 所属范畴 default: all
            isSeeAchieve: true,            // 是否查看已完成 default: true 查看
            isSeeTakeOrder: true,            // 是否查看已被接单的订单 default: true 查看
            searchFilter: '',               // 搜索框过滤
        },

        // 设置discussList 全局评论内容全部仅依靠该对象
        discussList:[],
    },
    getters:{
        // 实时监听state值的变化(最新状态)
        getUserInfo(state){
            return state.user;
        },
        // 获取用户头像路径
        getUserAvatar(state){
            return state.avatarPath
        },
        // 获取过Errand界面的过滤属性
        getErrandFilterType(state){
            return state.errandFilterType;
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
        },
        // 更新过滤属性
        // 更新所属范畴
        updateErrandTypeCategory(state, category){
            state.errandFilterType.category = category
        },
        // 更新是否查看已完成订单
        updateErrandTypeSeeIsAchieve(state, isSeeAchieve){
            state.errandFilterType.isSeeAchieve = isSeeAchieve
        },
        // 更新是否查看已被接单订单
        updateErrandTypeIsSeeTakeOrder(state, isSeeTakeOrder){
            state.errandFilterType.isSeeTakeOrder = isSeeTakeOrder
        },
        // 更新评论信息对象
        updateDiscussList(state, discussList){
            state.discussList = discussList;
        }
    }
})
