
import { ElectraState } from '../electra/types'
 /**
  * allowed states to be passed to the header feature
  */
export interface State {
  header: HeaderState,
  electra: ElectraState
}

export interface DispatchProps {
  getStakingInfo(): GetStakingInfo,
  getConnectionsCount(): GetConnectionsCount,
  getBlockCount(): GetBlockCount
}

export interface HeaderState {
  connectionsCount?: number
  walletStakingInfo: WalletStakingInfo,
  blockCount?: number
}

export interface WalletStakingInfo {
  // tslint:disable-next-line:no-magic-numbers
  networkWeight?: number,
  nextRewardIn?: number,
  staking?: boolean,
  weight?: number
}

/**
 * Staking types interfaces
 */
export type GET_STAKING_INFO = 'GET_STAKING_INFO'
export type GET_STAKING_INFO_FAIL = 'GET_STAKING_INFO_FAIL'
export type GET_STAKING_INFO_SUCCESS = 'GET_STAKING_INFO_SUCCESS'

export interface GetStakingInfo {
  type: GET_STAKING_INFO
}

export interface GetStakingInfoFail {
  type: GET_STAKING_INFO_FAIL
}

export interface GetStakingInfoSuccess {
  type: GET_STAKING_INFO_SUCCESS,
  payload: WalletStakingInfo
}

export type StakingInfoTypes = GET_STAKING_INFO |
                              GET_STAKING_INFO_FAIL |
                              GET_STAKING_INFO_SUCCESS

export type StakingActions = GetStakingInfo |
                            GetStakingInfoFail |
                            GetStakingInfoSuccess

export interface StakingInfoObservable { payload?: WalletStakingInfo, type: StakingInfoTypes }
/**
 * Connection types and interfaces
 */
export type GET_CONNECTIONS_COUNT = 'GET_CONNECTIONS_COUNT'
export type GET_CONNECTIONS_COUNT_SUCCESS = 'GET_CONNECTIONS_COUNT_SUCCESS'
export type GET_CONNECTIONS_COUNT_FAIL = 'GET_CONNECTIONS_COUNT_FAIL'

export interface GetConnectionsCount {
  type: GET_CONNECTIONS_COUNT
}

export interface GetConnectionsCountSuccess {
  type: GET_CONNECTIONS_COUNT_SUCCESS,
  payload: number
}

export interface GetConnectionsCountFail {
  type: GET_CONNECTIONS_COUNT_FAIL
}

export type ConnectionCountTypes = GET_CONNECTIONS_COUNT |
                                  GET_CONNECTIONS_COUNT_FAIL |
                                  GET_CONNECTIONS_COUNT_SUCCESS

export type ConnectionActions = GetConnectionsCount |
                                GetConnectionsCountSuccess |
                                GetConnectionsCountFail

export interface ConnectionCountObservable { payload?: number, type: ConnectionCountTypes }

/**
 * Blocks types and interfaces
 */
export type GET_BLOCK_COUNT = 'GET_BLOCK_COUNT'
export type GET_BLOCK_COUNT_SUCCESS = 'GET_BLOCK_COUNT_SUCCESS'
export type GET_BLOCK_COUNT_FAIL = 'GET_BLOCK_COUNT_FAIL'

export interface GetBlockCount {
  type: GET_BLOCK_COUNT
}

export interface GetBlockCountSuccess {
  type: GET_BLOCK_COUNT_SUCCESS,
  payload: number
}

export interface GetBlockCountFail {
  type: GET_BLOCK_COUNT_FAIL
}

export type BlockActions =  GetBlockCount |
                            GetBlockCountSuccess |
                            GetBlockCountFail

export type HeaderActions =   StakingActions |
                              ConnectionActions |
                              BlockActions
