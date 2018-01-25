import Vue from 'vue'
import Router from 'vue-router'

import ViewOverview from '../views/view-overview.vue'
import ViewSend from '../views/view-send.vue'
import ViewReceive from '../views/view-receive.vue'
import ViewTransactions from '../views/view-transactions.vue'
import ViewAddressBook from '../views/view-address-book.vue'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      name: 'Overview',
      component: ViewOverview
    },
    {
      path: '/send',
      name: 'Send ECA',
      component: ViewSend
    },
    {
      path: '/receive',
      name: 'Receive ECA',
      component: ViewReceive
    },
    {
      path: '/transactions',
      name: 'Transactions',
      component: ViewTransactions
    },
    {
      path: '/address-book',
      name: 'Address Book',
      component: ViewAddressBook
    }
  ]
})
