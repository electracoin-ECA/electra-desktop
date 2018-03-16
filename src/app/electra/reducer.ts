import * as ActionNames from './action-names'
import { ElectraActions, ElectraState} from './types'

const initialState: ElectraState = {
  electraJs: null
}

export default function electraReducer(state: ElectraState = initialState, action: ElectraActions): any {
  switch (action.type) {
    case ActionNames.INITIALIZE_ELECTRA_SUCCESS: {
      return {
        ...state,
        electraJs: action.payload.electraJs
      }
    }
    case ActionNames.INITIALIZE_ELECTRA_FAIL: {
      return {...state}
    }
    case ActionNames.START_DAEMON_SUCCESS: {
      return {...state}
    }
    case ActionNames.START_DAEMON_FAIL: {
      return {...state}
    }
    case ActionNames.GENERATE_HARD_WALLET_SUCCESS: {
      return {...state}
    }
    case ActionNames.GENERATE_HARD_WALLET_FAIL: {
      return {...state}
    }
    case ActionNames.STOP_DAEMON_SUCCESS: {
      return {...state}
    }
    case ActionNames.STOP_DAEMON_FAIL: {
      return {...state}
    }
    default: return state
  }
}
