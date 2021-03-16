import Vue from 'vue'
import Vuex from 'vuex'
import AuthenticationService from '@/services/AuthenticationService'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: null,
    user: null,
    isUserLoggedIn: false
  },
  getters: {
    isUserLoggedIn(state) {
      return state.isUserLoggedIn
    }
  },
  mutations: {
    setToken(state, token) {
      state.token = token
      if(token) {
        state.isUserLoggedIn = true
      }
      else {
        state.isUserLoggedIn = false
      }
    },
    setUser(state, user) {
      state.user = user
    }
  },
  actions: {
    async signIn({ dispatch }, credentials) {
       let response = await AuthenticationService.login(credentials)
       return dispatch('attempt', response.data.token)
    },
    setToken({ commit }, token) {
      commit('setToken', token)
    },
    setUser({ commit }, user) {
      commit('setUser', user)
    },
    async attempt({ commit, state }, token) {
      if(token) {
        commit('setToken', token)
      }
      if(!state.token) {
        return
      }
      // call to the me endpoint and grab user if fails set the user and token to null
    }
  },
  modules: {
  }
})
