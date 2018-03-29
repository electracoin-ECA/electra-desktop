import * as moment from 'moment'
import * as ActionNames from './action-names'
import { HeaderActions, HeaderState } from './types'

const initialState: HeaderState = {
  walletInfo: {
    connectionsCount: 0,
    isHD: false,
    isStaking: false,
    isSynchonized: false,
    lastBlockGeneratedAt: 0,
    localBlockchainHeight: 0,
    localStakingWeight: 0,
    networkBlockchainHeight: 0,
    networkStakingWeight: 0,
    nextStakingRewardIn: 0
  }
}

export default function(state: HeaderState = initialState, action: HeaderActions): any {
  switch (action.type) {
    case ActionNames.GET_WALLET_INFO_SUCCESS: {
      const {
        connectionsCount,
        isHD,
        isStaking,
        isSynchonized,
        lastBlockGeneratedAt,
        localBlockchainHeight,
        localStakingWeight,
        networkBlockchainHeight,
        networkStakingWeight,
        nextStakingRewardIn
      } = action.payload

      return {
        ...state,
        walletInfo: {
          connectionsCount,
          isHD,
          isStaking,
          isSynchonized,
          lastBlockGeneratedAt: moment.unix(lastBlockGeneratedAt).fromNow(),
          localBlockchainHeight,
          localStakingWeight,
          networkBlockchainHeight,
          networkStakingWeight,
          nextStakingRewardIn
        }
      }
    }
    case ActionNames.GET_WALLET_INFO_FAIL: {
      return {
        ...state,
      }
    }
    default: return state
  }
}
