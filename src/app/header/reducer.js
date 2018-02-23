import * as AN from './action-names'

const initialState = {
  networkWeight: null,
  nextRewardIn: null,
  weight: null
}

export default function (state = initialState, action) {
  switch (action.type) {
    case AN.RECEIVED_STAKING_INFO:
      const {networkWeight, nextRewardIn, weight} = action.payload
      return {
        ...state,
        networkWeight,
        nextRewardIn,
        weight
      }
      break;
    default:
      return state
  }
}
