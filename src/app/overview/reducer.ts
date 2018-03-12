import * as ActionNames from './action-names'
import { OverviewActions, OverviewState } from './types'

const initialState: OverviewState = {
  globalBalance: 0
}

export default function overviewReducer(state: OverviewState = initialState, action: OverviewActions): any {
  switch (action.type) {
    case ActionNames.GET_GLOBAL_BALANCE_SUCCESS: {
      return {
        ...state,
        globalBalance: action.globalBalance
      }
    }
    case ActionNames.GET_GLOBAL_BALANCE_FAIL: {
      return {
        ...state,
      }
    }
    default: return state
  }
}
