import * as ActionNames from './action-names'
import { GetConnectionsCount, GetStakingInfo } from './types'

export function getStakingInfo(): GetStakingInfo {
  return {
    type: ActionNames.GET_STAKING_INFO
  }
}

export function getConnectionsCount(): GetConnectionsCount {
  return {
    type: ActionNames.GET_CONNECTIONS_COUNT
  }
}
