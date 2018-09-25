import { ActionsObservable, ofType } from 'redux-observable'
import { delay, mapTo } from 'rxjs/operators'

import { ActionList as PaymentActionList, ActionType as PaymentsActionType } from '../../payments/types'
import * as ToastActionNames from './actionNames'
import { FAILED, SEND_FAIL, SEND_SUCCESS, SUCCESS } from './toastMessages'
import { ToastActions } from './types'

const MAX_DELAY = 5000

export function hideToastMessageAndBadge(action$: ActionsObservable<ToastActions>): any {
  return action$.pipe(
    ofType(ToastActionNames.SET_MESSAGE_AND_BADGE),
    delay(MAX_DELAY),
    mapTo({
      type: ToastActionNames.HIDE_MESSAGE_AND_BADGE,
    }),
  )
}

export function setToastMessageAndBadgeOnSendSuccess(
  action$: ActionsObservable<PaymentActionList[keyof PaymentActionList] | ToastActions>,
): any {
  return action$.pipe(
    ofType(PaymentsActionType.SEND_TRANSACTION_SUCCESS),
    mapTo({
      payload: {
        badge: SUCCESS,
        message: SEND_SUCCESS,
      },
      type: ToastActionNames.SET_MESSAGE_AND_BADGE,
    }),
  )
}

export function setToastMessageAndBadgeOnSendFail(
  action$: ActionsObservable<PaymentActionList[keyof PaymentActionList] | ToastActions>,
): any {
  return action$.pipe(
    ofType(PaymentsActionType.SEND_TRANSACTION_ERROR),
    mapTo({
      payload: {
        badge: FAILED,
        message: SEND_FAIL,
      },
      type: ToastActionNames.SET_MESSAGE_AND_BADGE,
    }),
  )
}
