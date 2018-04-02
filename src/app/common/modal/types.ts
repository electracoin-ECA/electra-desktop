import {
  ClearSendCardFields,
  PaymentsState,
  SendEca,
  SetOpened
} from '../../payments/types'
import { SetMessageAndBadge } from '../toast/types'

export interface ModalState {
  message: string,
  title: string,
  opened: boolean
}

export interface StateProps {
  modal: ModalState,
  payments: PaymentsState
}

export interface DispatchProps {
  setUnlocked(value: string): any,
  clearSendCardFields(): ClearSendCardFields,
  sendEca(amount: number, to: string): SendEca,
  setOpened(value: boolean): SetOpened,
  setMessageAndBadge(message: string, badge: string): SetMessageAndBadge
}

/**
 * Modal types interfaces
 */
export type SET_OPENED = 'SET_OPENED'
export type SET_UNLOCKED = 'SET_UNLOCKED'
export type SET_UNLOCKED_SUCCESS = 'SET_UNLOCKED_SUCCESS'
export type SET_UNLOCKED_FAIL = 'SET_UNLOCKED_FAIL'
export type SET_LOCKED_SUCCESS = 'SET_LOCKED_SUCCESS'
export type SET_LOCKED_FAIL = 'SET_LOCKED_FAIL'

export interface ModalActions {
  type: string,
  payload: boolean
}
