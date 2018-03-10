import * as ActionNames from './action-names'
import { HeaderState, StakingActions} from './types'

const initialState: HeaderState = {
  walletStakingInfo: {
    networkWeight: -1,
    nextRewardIn: -1,
    staking: false,
    weight: -1
  }
}

export default function(state: HeaderState = initialState, action: StakingActions): any {
  switch (action.type) {
    case ActionNames.GET_STAKING_INFO_SUCCESS: {
      const { networkWeight, nextRewardIn, weight } = action.payload

      return {
        walletStakingInfo: {
        networkWeight,
        nextRewardIn,
        weight
        }
      }
    }
    case ActionNames.GET_STAKING_INFO_FAIL: {
      return {
        ...state,
      }
    }
    default: return state
  }
}
