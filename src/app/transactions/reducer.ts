import { WalletTransaction } from 'electra-js/dist/wallet/types'
import * as ActionNames from './action-names'
import { TransactionsActions } from './types'

const initState: WalletTransaction[] = []

export default function transactionsReducer(state: WalletTransaction[] = initState, action: TransactionsActions): any {
  switch (action.type) {
    case ActionNames.GET_TRANSACTIONS_SUCCESS: {
      const transactions: WalletTransaction[] = action.payload

      return {
          ...state,
          transactions
      }
    }
    case ActionNames.GET_TRANSACTIONS_FAIL: {
      return {
        ...state
      }
    }
    default: return state
  }
}
