// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

// Load vue relative library
import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'

// Load extern library
import ElementUI from 'element-ui'
import moment from 'vue-moment'
import './assets/styles/index.css'

// Load interne component
import App from './App'
import router from './router'
import storeModule from './store'

// Setup Vue instance
Vue.use(Vuex)
Vue.use(VueResource)
Vue.use(ElementUI)
Vue.use(moment)

Vue.config.productionTip = false

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
