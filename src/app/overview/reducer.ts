import * as ActionNames from './action-names'
import { OverviewActions, OverviewState } from './types'

const initialState: OverviewState = {
  confirmedBalance: 0,
  currentPriceBTC: 0,
  currentPriceUSD: 0,
  isLoading: true,
  unconfirmedBalance: 0,
}

export default function overviewReducer(state: OverviewState = initialState, action: OverviewActions): any {
  switch (action.type) {
    case ActionNames.GET_GLOBAL_BALANCE_SUCCESS: {
      return {
        ...state,
        confirmedBalance: action.payload.confirmed,
        unconfirmedBalance: action.payload.unconfirmed,
      }
    }
    case ActionNames.GET_GLOBAL_BALANCE_FAIL: {
      return {
        ...state,
      }
    }
    case ActionNames.GET_CURRENT_PRICE_USD_SUCCESS: {
      return {
        ...state,
        currentPriceUSD: action.payload,
      }
    }
    case ActionNames.GET_CURRENT_PRICE_USD_FAIL: {
      return {
        ...state,
      }
    }
    case ActionNames.GET_CURRENT_PRICE_BTC_SUCCESS: {
      return {
        ...state,
        currentPriceBTC: action.payload,
      }
    }
    case ActionNames.GET_CURRENT_PRICE_BTC_FAIL: {
      return {
        ...state,
      }
    }
    case ActionNames.TOGGLE_OFF_TRANSACTIONS_LOADING: {
      return {
        ...state,
        isLoading: false,
      }
    }
    case ActionNames.TOGGLE_ON_TRANSACTIONS_LOADING: {
      return {
        ...state,
        isLoading: true,
      }
    }
    default: return state
  }
}
