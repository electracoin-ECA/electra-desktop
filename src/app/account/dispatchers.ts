import { AccountCategory, ActionList, ActionType, Dispatchers } from './types'

const dispatchers: Dispatchers = {
  getBalanceAndTransactions: (category: AccountCategory): ActionList['GET_BALANCE_AND_TRANSACTIONS'] => ({
    payload: category,
    type: ActionType.GET_BALANCE_AND_TRANSACTIONS,
  }),

  resetAccountState: (category: AccountCategory): ActionList['RESET_ACCOUNT_STATE'] => ({
    payload: category,
    type: ActionType.RESET_ACCOUNT_STATE,
  }),
}

export default dispatchers
