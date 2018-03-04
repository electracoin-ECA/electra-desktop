import * as ActionNames from './action-names'

const initialState = {
  networkWeight: null,
  nextRewardIn: null,
  weight: null
}

export default function (state = initialState, action: any) {
  switch (action.type) {
    case ActionNames.SUCCESSFULLY_RETRIEVED_STAKING_INFO: {
      const { networkWeight, nextRewardIn, weight } = action.payload
      return {
        ...state,
        networkWeight,
        nextRewardIn,
        weight
      }
    }
    case ActionNames.FAILED_TO_RETRIEVE_STAKING_INFO: {
      return {
        ...state,
      }
    }
    default:
      return state
  }
}
