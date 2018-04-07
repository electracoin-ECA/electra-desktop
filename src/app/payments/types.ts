import { WalletAddress } from 'electra-js'

import { SetMessageAndBadge } from '../common/toast/types'
import { ActionBaseWithPayload, ActionListGenerator } from '../types'

/*
 * State
 */
export interface State {
  addresses: WalletAddress[]
  isUnlockModalOpened: boolean
  pendingTransaction: PendingTransaction
}
export interface PendingTransaction {
  amount: number
  to: string
}

/*
 * Dispatchers
 */
export type Dispatchers = {
  clearSendCardFields(): ActionList['CLEAR_SEND_CARD_FIELDS']
  getAddresses(): ActionList['GET_ADDRESSES']
  sendEca(amount: number, to: string): ActionList['SEND_ECA']
  setAmount(amount: number): ActionList['SET_AMOUNT']
  setToAddress(address: string): ActionList['SET_TO_ADDRESS']
  toggleUnlockModal(): ActionList['TOGGLE_UNLOCK_MODAL']
}
export type ComponentDispatchers = Dispatchers & {
  setMessageAndBadge(message: string, badge: string): SetMessageAndBadge
}

/*
 * Actions
 */
export enum ActionType {
  CLEAR_SEND_CARD_FIELDS = 'CLEAR_SEND_CARD_FIELDS',
  GET_ADDRESSES = 'GET_ADDRESSES',
  GET_ADDRESSES_FAIL = 'GET_ADDRESSES_FAIL',
  GET_ADDRESSES_SUCCESS = 'GET_ADDRESSES_SUCCESS',
  SEND_ECA = 'SEND_ECA',
  SEND_ECA_FAIL = 'SEND_ECA_FAIL',
  SEND_ECA_SUCCESS = 'SEND_ECA_SUCCESS',
  SET_AMOUNT = 'SET_AMOUNT',
  SET_TO_ADDRESS = 'SET_TO_ADDRESS',
  TOGGLE_UNLOCK_MODAL = 'TOGGLE_UNLOCK_MODAL',
}

export type ActionList = ActionListGenerator<ActionType, {
  GET_ADDRESSES_SUCCESS: ActionBaseWithPayload<ActionType.GET_ADDRESSES_SUCCESS, WalletAddress[]>
  SEND_ECA: ActionBaseWithPayload<ActionType.SEND_ECA, PendingTransaction>
  SET_AMOUNT: ActionBaseWithPayload<ActionType.SET_AMOUNT, number>
  SET_TO_ADDRESS: ActionBaseWithPayload<ActionType.SET_TO_ADDRESS, string>
}>
