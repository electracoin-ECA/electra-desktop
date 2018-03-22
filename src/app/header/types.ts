
import { WalletInfo } from 'electra-js'
import { ElectraState } from '../electra/types'

/**
 * allowed states to be passed to the header feature
 */
export interface State {
  header: HeaderState,
  electra: ElectraState
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

export interface GetWalletInfo {
  type: GET_WALLET_INFO
}

export interface GetWalletInfoFail {
  type: GET_WALLET_INFO_FAIL
}

export interface GetWalletInfoSuccess {
  type: GET_WALLET_INFO_SUCCESS,
  payload: WalletInfo
}

export type WalletInfoTypes = GET_WALLET_INFO |
                              GET_WALLET_INFO_FAIL |
                              GET_WALLET_INFO_SUCCESS

export type WalletInfoActions = GetWalletInfo |
                                GetWalletInfoFail |
                                GetWalletInfoSuccess

export interface WalletInfoObservable { payload: WalletInfo, type: WalletInfoTypes }

export type HeaderActions =   WalletInfoObservable
