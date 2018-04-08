import { WalletAddress } from 'electra-js'

import { SetMessageAndBadge } from '../common/toast/types'
import { ActionBaseWithPayload, ActionListGenerator } from '../types'

/*
 * State
 */
export interface State {
  addresses: WalletAddress[]
  addressError: string | undefined
  amountError: string | undefined
  isUnlockModalOpened: boolean
}
export interface Transaction {
  amount: number
  toAddress: string
}

/*
 * Dispatchers
 */
export type Dispatchers = {
  getAddresses(): ActionList['GET_ADDRESSES']
  submitTransaction(amount: number, toAddress: string): ActionList['SUBMIT_TRANSACTION']
  toggleUnlockModal(): ActionList['TOGGLE_UNLOCK_MODAL']
}
export type ComponentDispatchers = Dispatchers & {
  setMessageAndBadge(message: string, badge: string): SetMessageAndBadge
}

/*
 * Actions
 */
export enum ActionType {
  GET_ADDRESSES = 'GET_ADDRESSES',
  GET_ADDRESSES_ERROR = 'GET_ADDRESSES_ERROR',
  GET_ADDRESSES_SUCCESS = 'GET_ADDRESSES_SUCCESS',
  SEND_TRANSACTION = 'SEND_TRANSACTION',
  SEND_TRANSACTION_ERROR = 'SEND_TRANSACTION_ERROR',
  SEND_TRANSACTION_SUCCESS = 'SEND_TRANSACTION_SUCCESS',
  SUBMIT_TRANSACTION = 'SUBMIT_TRANSACTION',
  SUBMIT_TRANSACTION_ERROR = 'SUBMIT_TRANSACTION_ERROR',
  TOGGLE_UNLOCK_MODAL = 'TOGGLE_UNLOCK_MODAL',
}

export type ActionList = ActionListGenerator<ActionType, {
  GET_ADDRESSES_SUCCESS: ActionBaseWithPayload<ActionType.GET_ADDRESSES_SUCCESS, WalletAddress[]>
  SEND_TRANSACTION: ActionBaseWithPayload<ActionType.SEND_TRANSACTION, Transaction>
  SUBMIT_TRANSACTION: ActionBaseWithPayload<ActionType.SUBMIT_TRANSACTION, Transaction>
  SUBMIT_TRANSACTION_ERROR: ActionBaseWithPayload<
    ActionType.SUBMIT_TRANSACTION_ERROR,
    { addressError?: string, amountError?: string }
  >
}>
