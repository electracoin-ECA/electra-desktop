import { WalletAddress } from 'electra-js'
import { SetMessageAndBadge } from '../common/toast/types'

export interface StateProps {
  payments: PaymentsState
}

export interface DispatchProps {
  clearSendCardFields(): ClearSendCardFields,
  getAddresses(): GetAddresses,
  sendEca(amount: number, to: string): SendEca,
  setAmount(value: number): SetAmount,
  setToAddress(value: string): SetToAddress,
  setMessageAndBadge(message: string, badge: string): SetMessageAndBadge
}

export interface PaymentsState {
  addresses: WalletAddress[],
  pendingSend: PendingSendState
}

export interface PendingSendState {
  amount: number,
  to: string
}

/**
 * Payments types interfaces
 */
export type SEND_ECA = 'SEND_ECA'
export type SEND_ECA_FAIL = 'SEND_ECA_FAIL'
export type SEND_ECA_SUCCESS = 'SEND_ECA_SUCCESS'
export type GET_ADDRESSES = 'GET_ADDRESSES'
export type GET_ADDRESSES_FAIL = 'GET_ADDRESSES_FAIL'
export type GET_ADDRESSES_SUCCESS = 'GET_ADDRESSES_SUCCESS'
export type SET_TO_ADDRESS = 'SET_TO_ADDRESS'
export type SET_AMOUNT = 'SET_AMOUNT'
export type CLEAR_SEND_CARD_FIELDS = 'CLEAR_SEND_CARD_FIELDS'

export interface ClearSendCardFields {
  type: CLEAR_SEND_CARD_FIELDS
}

export interface SendEca {
  payload: PendingSendState,
  type: SEND_ECA
}

export interface SendEcaFail {
  type: SEND_ECA_FAIL
}

export interface SendEcaSuccess {
  type: SEND_ECA_SUCCESS
}

export interface GetAddresses {
  type: GET_ADDRESSES
}

export interface GetAddressesFail {
  type: GET_ADDRESSES_FAIL
}

export interface GetAddressesSuccess {
  payload: WalletAddress[],
  type: GET_ADDRESSES_SUCCESS
}

export interface SetToAddress {
  type: SET_TO_ADDRESS,
  payload: string
}

export interface SetAmount {
  type: SET_AMOUNT,
  payload: number
}

export type PaymentsActions = SendEca |
  SendEcaFail |
  SendEcaSuccess |
  GetAddresses |
  GetAddressesFail |
  GetAddressesSuccess |
  SetToAddress |
  SetAmount |
  ClearSendCardFields
