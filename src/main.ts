import 'babel-polyfill'
import Vue from 'vue'
import Vuex from 'vuex'
import App from './components/App.vue'
import router from './router'
import store from './store/index.js'
import { getAllMessages } from './store/actions.js'

Vue.filter('time', timestamp => {
  return new Date(timestamp).toLocaleTimeString()
})

Vue.config.devtools = true

new Vue({
  el: '#app',
  router,
  store,
  template: '</App>',
  render: h => h(App)
})

getAllMessages(store);