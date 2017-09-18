import 'babel-polyfill'
import Vue from 'vue'
import Vuex from 'vuex'
import App from './components/App.vue'
import 'iview/dist/styles/iview.css'
import iView from 'iview';
import store from './store'
import { getAllMessages } from './store/actions'

Vue.use(iView);

Vue.filter('time', timestamp => {
  return new Date(timestamp).toLocaleTimeString()
})

new Vue({
  el: '#app',
  store,
  render: h => h(App)
})

getAllMessages(store);