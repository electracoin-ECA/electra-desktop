import Vue from 'vue'
import Electron from 'vue-electron'
import svgicon from 'vue-svgicon'
import App from './app.vue'
import router from './router'
import store from './store'
import { sync } from 'vuex-router-sync'

sync(store, router)

Vue.use(Electron)
Vue.use(svgicon, { tagName: 'icon'})

const app = new Vue({
  router,
  store,
  ...App
})

export default app