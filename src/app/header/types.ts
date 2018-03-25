import { WalletInfo } from 'electra-js'
import { Action } from 'redux'

export interface StateProps {
  header: HeaderState
}

export interface DispatchProps {
  getWalletInfo(): GetWalletInfo,
}

export interface HeaderState {
  walletInfo: WalletInfo
}

/**
 * Staking types interfaces
 */
export type GET_WALLET_INFO = 'GET_WALLET_INFO'
export type GET_WALLET_INFO_FAIL = 'GET_WALLET_INFO_FAIL'
export type GET_WALLET_INFO_SUCCESS = 'GET_WALLET_INFO_SUCCESS'

export interface GetWalletInfo extends Action {
  type: GET_WALLET_INFO
}

export interface GetWalletInfoFail extends Action {
  type: GET_WALLET_INFO_FAIL
}

export interface GetWalletInfoSuccess extends Action {
  type: GET_WALLET_INFO_SUCCESS
  payload: WalletInfo
}

export type WalletInfoTypes = GET_WALLET_INFO |
                              GET_WALLET_INFO_FAIL |
                              GET_WALLET_INFO_SUCCESS

export type WalletInfoActions = GetWalletInfo |
                                GetWalletInfoFail |
                                GetWalletInfoSuccess

export interface WalletInfoObservable {
  payload: WalletInfo
  type: WalletInfoTypes
}

export type HeaderActions = WalletInfoObservable
