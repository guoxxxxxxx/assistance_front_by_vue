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

        // 设置discussList 全局评论内容全部仅依靠该对象
        discussList:[],

        // 设置uploadImgList 全局图片上传路径
        uploadImgList: [],

        // 全局回显图片列表
        echoImgList: [],

        // 全局过滤属性
        queryCondition: {
            page: "1", // 所查询的页码
            category: "全部", // 所查询的种类
            fuzzyParam: "", // 模糊查询参数
            // 注意, 无法直接发送布尔值，只能用01来进行代替
            isHiddenAchieve: 0, // 是否隐藏已完成项目 1隐藏 0不隐藏
            isHiddenTakeOrders: 0,   // 是否隐藏已被接单项目
        },

        // 全局属性, 是否显示搜索框
        isShowSearch: true,

        // 全局项目总览
        allItems: {},

        // 用于存放记录总条数, 显示页码时需要用到
        itemsCount: 0,

        // 全局管理员界面信息
        manager: {
            title: '',          // 标题
            methodName: '',     // 方法名
            discussCount: 0,    // 讨论数量
            replyCount: 0,      // 回复数量
            itemCount: 0,       // 项目总数量
            pre_take: 0,       // 已接单百分比
            pre_dont: 0,        //未结单百分比
            pre_achieve: 0,     // 已完成百分比
            itemTable: [],      // 项目表格
            discussTable: [],   // 讨论表格
            replyTable: [],     // 回复表格
        }
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
        },
        // 更新全局查询条件对象
        updateQueryCondition(state, queryCondition){
            state.queryCondition = queryCondition;
        }
    }
})
