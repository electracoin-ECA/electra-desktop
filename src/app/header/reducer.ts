import { ActionList, ActionType, State } from './types'

const initialState: State = {
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
    nextStakingRewardIn: 0,
  },
}

export default function(state: State = initialState, action: ActionList[keyof ActionList]): State {
  switch (action.type) {
    case ActionType.GET_WALLET_INFO_SUCCESS:
      return ({
        ...state,
        walletInfo: action.payload,
      })

    default: return state
  }
}
