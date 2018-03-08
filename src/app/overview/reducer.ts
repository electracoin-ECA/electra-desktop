import * as ActionNames from './action-names'

const initialState = {
  globalBalance: 0
}

export default function overviewReducer(state = initialState, action: any) {
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
