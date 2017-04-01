import Vue from 'vue'
import Electron from 'vue-electron'
import Router from 'vue-router'

import App from './App'
import routes from './routes'

import VueLazyload from 'vue-lazyload'
import 'font-awesome/css/font-awesome.css'

Vue.use(Electron)
Vue.use(Router)
Vue.use(VueLazyload, {
  preLoad: 1.3,
  lazyComponent: true
})
Vue.config.debug = true

const router = new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes
})

/* eslint-disable no-new */
new Vue({
  router,
  ...App
}).$mount('#app')
