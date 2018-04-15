import { WalletAddressCategory } from 'electra-js'

import * as ActionNames from './action-names'
import { Dispatchers } from './types'

const dispatchers: Dispatchers = {
  getBalance: (category?: WalletAddressCategory) => ({
    payload: category,
    type: ActionNames.GET_GLOBAL_BALANCE,
  }),

  getCurrentPriceInUSD: () => ({
    type: ActionNames.GET_CURRENT_PRICE_USD,
  }),

  getCurrentPriceInBTC: () => ({
    type: ActionNames.GET_CURRENT_PRICE_BTC,
  }),

  toggleOffTransactionsLoading: () => ({
    type: ActionNames.TOGGLE_OFF_TRANSACTIONS_LOADING,
  }),

  toggleOnTransactionsLoading: () => ({
    type: ActionNames.TOGGLE_ON_TRANSACTIONS_LOADING,
  }),
}

export default dispatchers
