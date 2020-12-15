import Vue from 'vue'
import VueRouter from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('./pages/home.vue'),
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('./pages/about.vue'),
  },
]

Vue.use(VueRouter)
const router = new VueRouter({
  mode: 'history',
  routes,
})

export default router
