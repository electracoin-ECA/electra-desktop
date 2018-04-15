import { WalletAddressCategory } from 'electra-js'

import * as ActionNames from './action-names'
import { GetTransaction, GetTransactions } from './types'

export function getTransactions(category?: WalletAddressCategory): GetTransactions {
  return {
    payload: category,
    type: ActionNames.GET_TRANSACTIONS,
  }
}

export function getTransaction(id: string): GetTransaction {
  return {
    payload: id,
    type: ActionNames.GET_TRANSACTION,
  }
}
