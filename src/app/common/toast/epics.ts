import { Store } from 'redux'
import { ActionsObservable } from 'redux-observable'
import { Observable } from 'rxjs/Observable'

import { ActionList as PaymentActionList, ActionType as PaymentsActionType } from '../../payments/types'
import * as ToastActionNames from './action-names'
import { FAILED, SEND_FAIL, SEND_SUCCESS, SUCCESS } from './toast-messages'
import { ToastActions } from './types'

const MAX_DELAY = 5000

export function hideToastMessageAndBadge(action$: ActionsObservable<ToastActions>, store: Store<any>):
  Observable<any> {
  return action$.ofType(ToastActionNames.SET_MESSAGE_AND_BADGE)
    .switchMap(() => Observable.of({
      type: ToastActionNames.HIDE_MESSAGE_AND_BADGE,
    }).delay(MAX_DELAY))
}

export function setToastMessageAndBadgeOnSendSuccess(
  action$: ActionsObservable<PaymentActionList[keyof PaymentActionList] | ToastActions>,
  store: Store<any>,
): Observable<any> {
  return action$.ofType(PaymentsActionType.SEND_TRANSACTION_SUCCESS)
    .mapTo({
      payload: {
        badge: SUCCESS,
        message: SEND_SUCCESS,
      },
      type: ToastActionNames.SET_MESSAGE_AND_BADGE,
    })
}

export function setToastMessageAndBadgeOnSendFail(
  action$: ActionsObservable<PaymentActionList[keyof PaymentActionList] | ToastActions>,
  store: Store<any>,
): Observable<any> {
  return action$.ofType(PaymentsActionType.SEND_TRANSACTION_ERROR)
    .mapTo({
      payload: {
        badge: FAILED,
        message: SEND_FAIL,
      },
      type: ToastActionNames.SET_MESSAGE_AND_BADGE,
    })
}
