import Vue from 'vue'
import config from '@/config'
import md5 from 'md5'

const REGISTER = 'REGISTER'
const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
const REGISTER_FAILED = 'REGISTER_FAILED'
const LOGOUT = 'LOGOUT'

const USER_GET = 'USER_GET'
const USER_GET_FAILED = 'USER_GET_FAILED'

const moduleAuth = {
  state: {
    isLoggedIn: false,
    user: null
  },
  mutations: {
    [REGISTER] (state) {
      state.pending = true
    },
    [REGISTER_SUCCESS] (state, user) {
      state.isLoggedIn = true
      state.user = user
      state.registerPending = false
    },
    [REGISTER_FAILED] (state) {
      state.isLoggedIn = false
      state.registerPending = false
    },
    [LOGOUT] (state) {
      state.isLoggedIn = false
      state.user = null
    },
    [USER_GET] (state) {
      state.registerPending = true
    },
    [USER_GET_FAILED] (state) {
      state.pendingUser = false
    }
  },
  actions: {
    getUser ({ commit }, creds) {
      commit(USER_GET)
      const url = config.API_URL + '/users/' + md5(creds.email)
      return Vue.http.get(url, creds)
        .then(response => response.json())
        .then(json => {
          commit(REGISTER_SUCCESS, json)
          return json
        }).catch(() => {
          commit(USER_GET_FAILED)
        })
    },
    register ({ commit }, creds) {
      commit(REGISTER) // show spinner
      const url = config.API_URL + '/users'
      return Vue.http.post(url, creds)
        .then(response => response.json())
        .then(json => {
          commit(REGISTER_SUCCESS, json)
          return json
        }).catch(() => {
          commit(REGISTER_FAILED)
        })
    },
    logout ({ commit }) {
      localStorage.removeItem('token')
      commit(LOGOUT)
    }
  },
  getters: {
    isLoggedIn: state => {
      return state.isLoggedIn
    },
    getUser: state => {
      return state.user
    }
  }
}

export default moduleAuth
