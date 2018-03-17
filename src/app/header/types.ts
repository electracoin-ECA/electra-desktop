
import { WalletInfo } from 'electra-js/dist/wallet/types'
import { ElectraState } from '../electra/types'

 /**
  * allowed states to be passed to the header feature
  */
export interface State {
  header: HeaderState,
  electra: ElectraState
}

export interface DispatchProps {
  getLastBlockTimestamp(): GetLastBlockTimestamp,
  getWalletInfo(): GetWalletInfo
}

export interface HeaderState {
  walletInfo: WalletInfo,
  lastBlockGenTime: string
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

export type GET_LAST_BLOCK_TIMESTAMP = 'GET_LAST_BLOCK_TIMESTAMP'
export type GET_LAST_BLOCK_TIMESTAMP_SUCCESS = 'GET_LAST_BLOCK_TIMESTAMP_SUCCESS'
export type GET_LAST_BLOCK_TIMESTAMP_FAIL = 'GET_LAST_BLOCK_TIMESTAMP_FAIL'

export interface GetLastBlockTimestamp {
  type: GET_LAST_BLOCK_TIMESTAMP
}

export interface GetLastBlockTimestampSuccess {
  type: GET_LAST_BLOCK_TIMESTAMP_SUCCESS,
  payload: string
}

export interface GetLastBlockTimestampFail {
  type: GET_LAST_BLOCK_TIMESTAMP_FAIL
}

export interface LatestBlockInfo {
  time: number
}

export type BlockActions = GetLastBlockTimestamp |
  GetLastBlockTimestampSuccess |
  GetLastBlockTimestampFail

export type HeaderActions = WalletInfoObservable | BlockActions
