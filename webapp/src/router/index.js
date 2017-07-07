import Vue from 'vue'
import Router from 'vue-router'

// Local page component
import Home from '@/Pages/Home/Home'
import Stats from '@/Pages/Stats/Stats'
import Register from '@/Pages/Register/Register'
import Game from '@/Pages/Game/Game'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/stats',
      name: 'Stats',
      component: Stats
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/game',
      name: 'Game',
      component: Game
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
