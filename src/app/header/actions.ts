import * as ActionNames from './action-names'
import { GetStakingInfo } from './types'

export function getStakingInfo(): GetStakingInfo {
  return {
    type: ActionNames.GET_STAKING_INFO
  }
}
