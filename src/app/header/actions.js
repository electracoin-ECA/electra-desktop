import * as AN from './action-names'

export function getStakingInfo () {
  return {
    type: AN.GET_STAKING_INFO
  }
}

export function receivedStakingInfo (res) {
  return {
    type: AN.RECEIVED_STAKING_INFO,
    payload: {
      ...res
    }
  }
}
