import { AccountCategory, ActionList, ActionType, Dispatchers } from './types'

const dispatchers: Dispatchers = {
  getBalanceAndTransactions: (category: AccountCategory): ActionList['GET_BALANCE_AND_TRANSACTIONS'] => ({
    payload: category,
    type: ActionType.GET_BALANCE_AND_TRANSACTIONS,
  }),

  stopBalanceAndTransactionsLoop: (): ActionList['STOP_BALANCE_AND_TRANSACTIONS_LOOP'] => ({
    type: ActionType.STOP_BALANCE_AND_TRANSACTIONS_LOOP,
  }),
}

export default dispatchers
