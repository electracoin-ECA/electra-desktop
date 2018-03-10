
import { ElectraState } from '../electra/types'
 /**
  * allowed states to be passed to the header feature
  */
export interface State {
  header: HeaderState,
  electra: ElectraState
}

export interface DispatchProps {
  getStakingInfo(): GetStakingInfo
}

export interface HeaderState {
  walletStakingInfo: WalletStakingInfoPartial
}

export interface WalletStakingInfo {
  // tslint:disable-next-line:no-magic-numbers
  networkWeight: number,
  nextRewardIn: number,
  staking: boolean,
  weight: number
}

/**
 * Partial objects
 */
export type WalletStakingInfoPartial = Partial<WalletStakingInfo>
export type StatePartial = Partial<State>
export type DispatchPropsPartial = Partial<DispatchProps>

/**
 * action types
 */
export type GET_STAKING_INFO = 'GET_STAKING_INFO'
export type GET_STAKING_INFO_FAIL = 'GET_STAKING_INFO_FAIL'
export type GET_STAKING_INFO_SUCCESS = 'GET_STAKING_INFO_SUCCESS'

export interface GetStakingInfo {
  type: GET_STAKING_INFO,
  by?: string,
  payload?: WalletStakingInfo
}

export interface GetStakingInfoFail {
  type: GET_STAKING_INFO_FAIL,
  by: string,
  payload: WalletStakingInfo
}

export interface GetStakingInfoSuccess {
  type: GET_STAKING_INFO_SUCCESS,
  by: string,
  payload: WalletStakingInfo
}

export type StakingActions = GetStakingInfo | GetStakingInfoFail | GetStakingInfoSuccess
