import Vue from 'vue'
import Vuex from 'vuex'

// store modules
import walletModule from './module-wallet'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    walletModule
  }
})

export default store