import { SetMessageAndBadge } from '../common/toast/types'

export interface State {
  addresses: object[],
  payments: PaymentsState
}

export interface DispatchProps {
  clearSendCardFields(): ClearSendCardFields,
  sendEca(): SendEca,
  setAmount(value: number): SetAmount,
  setToAddress(value: string): SetToAddress,
  setMessageAndBadge(message: string, badge: string): SetMessageAndBadge
}

export interface PaymentsState {
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
export type SET_TO_ADDRESS = 'SET_TO_ADDRESS'
export type SET_AMOUNT = 'SET_AMOUNT'
export type CLEAR_SEND_CARD_FIELDS = 'CLEAR_SEND_CARD_FIELDS'

export interface ClearSendCardFields {
  type: CLEAR_SEND_CARD_FIELDS
}

export interface SendEca {
  type: SEND_ECA
}

export interface SendEcaFail {
  type: SEND_ECA_FAIL
}

export interface SendEcaSuccess {
  type: SEND_ECA_SUCCESS
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
  SetToAddress |
  SetAmount |
  ClearSendCardFields
