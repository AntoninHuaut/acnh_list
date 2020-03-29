import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Bugs from '../views/Bugs.vue'
import Fish from '../views/Fish.vue'
import Fossils from '../views/Fossils.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Accueil',
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
  },
  {
    path: '/fossils',
    name: 'Fossiles',
    component: Fossils
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  document.title = "ACNH Guide - " + to.name;
  next();
});

export default router