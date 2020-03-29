import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Bugs from '../views/Bugs.vue'
import Fish from '../views/Fish.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/bugs',
    name: 'Insectes',
    component: Bugs
  },
  {
    path: '/fish',
    name: 'Poissons',
    component: Fish
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
