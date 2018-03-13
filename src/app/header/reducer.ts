import * as ActionNames from './action-names'
import { HeaderActions, HeaderState} from './types'

const initialState: HeaderState = {
  connectionsCount: 0,
  walletStakingInfo: {
    networkWeight: 0,
    nextRewardIn: 0,
    staking: false,
    weight: 0
  }
}

export default function(state: HeaderState = initialState, action: HeaderActions): any {
  switch (action.type) {
    case ActionNames.GET_STAKING_INFO_SUCCESS: {
      const { networkWeight, nextRewardIn, weight, staking } = action.payload

      return {
        ...state,
        walletStakingInfo: {
          networkWeight,
          nextRewardIn,
          staking,
          weight
        }
      }
    }
    case ActionNames.GET_STAKING_INFO_FAIL: {
      return {
        ...state,
      }
    }
    case ActionNames.GET_CONNECTIONS_COUNT_SUCCESS: {
      return {
        ...state,
        connectionsCount: action.payload
      }
    }
    case ActionNames.GET_CONNECTIONS_COUNT_FAIL: {
      return {
        ...state,
      }
    }
    default: return state
  }
}
