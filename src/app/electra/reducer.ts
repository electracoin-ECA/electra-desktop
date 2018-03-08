import * as ActionNames from './action-names'

const initialState = {
  electraJs: null
}

export default function electraReducer(state = initialState, action: any) {
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
    case ActionNames.SUCCESSFULLY_GENERATED_HARD_WALLET: {
      return {
        ...state
      }
    }
    case ActionNames.FAILED_T0_GENERATE_HARD_WALLET: {
      return {
        ...state
      }
    }
    default: return state
  }
}
