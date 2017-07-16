// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

// Load vue relative library
import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'

// Load extern library
import ElementUI from 'element-ui'
import moment from 'vue-moment'
import FlagIcon from 'vue-flag-icon'

// Load interne component
import App from './App'
import router from './router'
import storeModule from './store'
import './assets/styles/index.css'
import './assets/material/material-icons.css'

// Setup Vue instance
Vue.use(Vuex)
Vue.use(VueResource)
Vue.use(ElementUI)
Vue.use(moment)
Vue.use(FlagIcon)

// Setup
Vue.config.productionTip = false
Vue.http.headers.common['Cache-Control'] = 'no-cache, no-store, must-revalidate'
Vue.http.headers.common.Expires = '0'

// Store
const store = new Vuex.Store({
  modules: storeModule
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
