import { ActionList, ActionType, State } from './types'

const initialState: State = {
  confirmedBalance: 0,
  currentPriceBTC: 0,
  currentPriceUSD: 0,
  isLoading: true,
  // savingsCumulatedRewards: undefined,
  transactions: [],
  unconfirmedBalance: 0,
}

export default function accountReducer(state: State = initialState, action: ActionList[keyof ActionList]): any {
  switch (action.type) {
    case ActionType.GET_BALANCE_AND_TRANSACTIONS_SUCCESS:
      return {
        ...state,
        confirmedBalance: action.payload.balance.confirmed,
        currentPriceBTC: action.payload.currentPriceBTC,
        currentPriceUSD: action.payload.currentPriceUSD,
        isLoading: false,
        savingsCumulatedRewards: action.payload.savingsCumulatedRewards,
        transactions: action.payload.transactions,
        unconfirmedBalance: action.payload.balance.unconfirmed,
      }

    case ActionType.STOP_BALANCE_AND_TRANSACTIONS_LOOP:
      return initialState

    default:
      return state
  }
}
