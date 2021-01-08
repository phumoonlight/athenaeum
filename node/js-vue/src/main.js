import Vue from 'vue'

import router from './router'
import App from './app.vue'

const vue = new Vue({
  router,
  render: (createElement) => createElement(App),
})

vue.$mount('#v-root')
