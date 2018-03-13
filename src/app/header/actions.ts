import * as ActionNames from './action-names'
import { GetBlockCount, GetConnectionsCount, GetStakingInfo } from './types'

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

export function getBlockCount(): GetBlockCount {
  return {
    type: ActionNames.GET_BLOCK_COUNT
  }
}
