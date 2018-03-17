import * as ActionNames from './action-names'
import { GetTransactions } from './types'

export function getTransactions(): GetTransactions {
  return {
    type: ActionNames.GET_TRANSACTIONS
  }
}
