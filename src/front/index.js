import Vue from 'vue'
import App from './App'

Vue.component('App', App)

new Vue({ // eslint-disable-line no-new
  el: '#app',
  data () {
    return {
      user: null
    }
  },
  render (h) {
    return h('App')
  },
})