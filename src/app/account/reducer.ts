import { AccountCategory, ActionList, ActionType, State } from './types'

const initialState: State = {
  confirmedBalance: 0,
  currentPriceBTC: 0,
  currentPriceUSD: 0,
  isLoading: true,
  transactions: [],
  unconfirmedBalance: 0,
}

let currentCategory: AccountCategory

export default function accountReducer(state: State = initialState, action: ActionList[keyof ActionList]): any {
  switch (action.type) {
    case ActionType.GET_BALANCE_AND_TRANSACTIONS_SUCCESS:
      if (action.payload.category !== currentCategory) return initialState

      return {
        ...state,
        confirmedBalance: action.payload.balance.confirmed,
        currentPriceBTC: action.payload.currentPriceBTC,
        currentPriceUSD: action.payload.currentPriceUSD,
        isLoading: false,
        transactions: action.payload.transactions,
        unconfirmedBalance: action.payload.balance.unconfirmed,
      }

    case ActionType.RESET_ACCOUNT_STATE:
      currentCategory = action.payload

      return initialState

    default:
      return state
  }
}
