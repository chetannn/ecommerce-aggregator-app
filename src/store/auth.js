import AuthenticationService from '@/services/AuthenticationService'

export default {
    namespaced: true,
    state: () => ({
        token: null,
        user: null,
        isUserLoggedIn: false
      }),
      getters: {
        isUserLoggedIn(state) {
            return state.isUserLoggedIn
          },
          user(state) {
            return state.user
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

           try {
             let response = await AuthenticationService.me()
             commit('setUser', response.data.user)
           }
           catch(e) {
             commit('setToken', null)
             commit('setUser', null)
           }
         },
         logout({ commit }) {
           commit('setToken', null)
           location.reload()
         }
    }
}