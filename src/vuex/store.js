// 该文件用于创建Vuex中的store
// 引入Vuex
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)


// 准备actions -- 用于响应组件中的动作
// 里面用于设置方法
const actions = {}
// 用于操作数据-- state
const mutations = {
    // 修改token, 并将token存入localStorage
    
}
// 用于存储数据
const state = {
    // 存储token
    Autorization: localStorage.getItem('Autorization') ? localStorage.getItem('Autorization') : ''
}

// 创建store
export default new Vuex.Store({
    actions,
    mutations,
    state,
})
