import * as ActionNames from './action-names'

const initialState = {
  electraJs: null
}

export default function electraReducer (state = initialState, action) {
  switch (action.type) {
    case ActionNames.INITIALIZE_ELECTRA_SUCCESS: {
      return {
        ...state,
        electraJs: action.payload.electraJs
      }
    }
    case ActionNames.INITIALIZE_ELECTRA_FAIL: {
      return {
        ...state
      }
    }
    case ActionNames.HARD_WALLET_GENERATION_SUCCESS: {
      return {
        ...state
      }
    }
    case ActionNames.HARD_WALLET_GENERATION_FAIL: {
      return {
        ...state
      }
    }
    default: return state
  }
}
