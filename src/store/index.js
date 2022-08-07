import Vue from 'vue'
import Vuex from 'vuex'
import { getToken, setToken } from '@/utils/auth'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // JSON.parse(localStorage.getItem('HEIMA_TOUTIAO_TOKEN'))
    tokenObj: getToken() || {},
    userInfo: {}
  },
  // mutations定义修改state的方法，通过commit触发
  // 定义的函数有2个参数，第一个是state，第二个是形参，接收传进来的数据
  mutations: {
    SET_TOKEN(state, payload) {
      state.tokenObj = payload
      // localStorage.setItem('HEIMA_TOUTIAO_TOKEN',JSON.stringify(payload))
      setToken(payload)
    },
    SET_USERINFO(state, payload) {
      state.userInfo = payload
    }
  }
})
