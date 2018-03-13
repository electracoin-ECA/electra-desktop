import * as ActionNames from './action-names'
import { OverviewActions, OverviewState } from './types'

const initialState: OverviewState = {
  currentPriceBTC: 0,
  currentPriceUSD: 0,
  globalBalance: 0
}

export default function overviewReducer(state: OverviewState = initialState, action: OverviewActions): any {
  switch (action.type) {
    case ActionNames.GET_GLOBAL_BALANCE_SUCCESS: {
      return {
        ...state,
        globalBalance: action.payload
      }
    }
    case ActionNames.GET_GLOBAL_BALANCE_FAIL: {
      return {
        ...state
      }
    }
    case ActionNames.GET_CURRENT_PRICE_USD_SUCCESS: {
      return {
        ...state,
        currentPriceUSD: action.payload
      }
    }
    case ActionNames.GET_CURRENT_PRICE_USD_FAIL: {
      return {
        ...state
      }
    }
    case ActionNames.GET_CURRENT_PRICE_BTC_SUCCESS: {
      return {
        ...state,
        currentPriceBTC: action.payload
      }
    }
    case ActionNames.GET_CURRENT_PRICE_BTC_FAIL: {
      return {
        ...state
      }
    }
    default: return state
  }
}
