import Vue from 'vue'
import Router from 'vue-router'
import Login from './components/Login.vue'
import Chat from './components/Chat.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/chat',
      name: 'chat',
      component: Chat
    }
  ]
})

export default router