import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Chatrooms from '../views/Chatrooms.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/chatrooms'
  },
  {
    path: '/chatrooms',
    name: 'Chatrooms',
    component: Chatrooms
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
]

const router = new VueRouter({
  routes
})

export default router
