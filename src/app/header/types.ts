import { WalletInfo } from 'electra-js'

import { ActionBaseWithPayload, ActionListGenerator } from '../../types'

/*
 * State
 */
export interface State {
  walletInfo: WalletInfo
}

/**
 * Dispatchers
 */
export interface Dispatchers {
  getWalletInfo(): ActionList['GET_WALLET_INFO'],
}

/*
 * Actions
 */
export enum ActionType {
  GET_WALLET_INFO = 'GET_WALLET_INFO',
  GET_WALLET_INFO_ERROR = 'GET_WALLET_INFO_ERROR',
  GET_WALLET_INFO_SUCCESS = 'GET_WALLET_INFO_SUCCESS',
  GET_WALLET_INFO_LOOP = 'GET_WALLET_INFO_LOOP',
}

export type ActionList = ActionListGenerator<ActionType, {
  GET_WALLET_INFO_SUCCESS: ActionBaseWithPayload<ActionType.GET_WALLET_INFO_SUCCESS, WalletInfo>
}>
