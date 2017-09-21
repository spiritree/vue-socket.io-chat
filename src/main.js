import 'babel-polyfill'
import Vue from 'vue'
import Vuex from 'vuex'
import App from './components/App.vue'
import router from './router'
import store from './store'
import { getAllMessages } from './store/actions'

Vue.filter('time', timestamp => {
  return new Date(timestamp).toLocaleTimeString()
})

new Vue({
  el: '#app',
  router,
  store,
  template: '</App>',
  render: h => h(App)
})

getAllMessages(store);