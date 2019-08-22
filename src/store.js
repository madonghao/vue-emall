import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    title: '网易严选'
  },
  mutations: {
    changeTitle(state, title) {
      state.title = title;
    }
  },
  actions: {

  }
})
