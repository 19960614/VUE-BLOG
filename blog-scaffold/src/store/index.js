import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    username: '' //用户名
  },
  mutations: {
    setusername(state, payload) {
      state.username = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
