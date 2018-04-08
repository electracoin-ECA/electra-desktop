import { WalletAddress, WalletBalance } from 'electra-js'
import { ActionsObservable } from 'redux-observable'
import { Observable } from 'rxjs/Observable'

import ElectraJsMiddleware from '../../middlewares/ElectraJs'
import { ActionList as UnlockModalActionsList, ActionType as UnlockModalActionType } from '../common/unlock-modal/types'
import { ActionList, ActionType, Transaction } from './types'

let pendingTransaction: Transaction | undefined

export default {
  closeUnlockModal: (action$: ActionsObservable<UnlockModalActionsList['CANCEL_UNLOCK_MODAL']>) =>
    action$.ofType(UnlockModalActionType.CANCEL_UNLOCK_MODAL)
      .mapTo({ type: ActionType.TOGGLE_UNLOCK_MODAL }),

  closeUnlockModalAndSendTransaction: (action$: ActionsObservable<
    UnlockModalActionsList['SET_LOCK_TO_UNLOCKED_SUCCESS']>,
  ) =>
    action$.ofType(UnlockModalActionType.SET_LOCK_TO_UNLOCKED_SUCCESS)
      .flatMap(() => {
        if (pendingTransaction !== undefined) {
          const payload = pendingTransaction
          pendingTransaction = undefined

          return [
            { type: ActionType.TOGGLE_UNLOCK_MODAL },
            {
              payload,
              type: ActionType.SEND_TRANSACTION,
            },
          ]
        }

        return [{ type: ActionType.TOGGLE_UNLOCK_MODAL }]
      }),

  getAddresses: (action$: ActionsObservable<ActionList['GET_ADDRESSES']>) =>
    action$.ofType(ActionType.GET_ADDRESSES)
      .map(() => ElectraJsMiddleware.wallet.addresses)
      .map((addresses: WalletAddress[]) => ({
        payload: addresses,
        type: ActionType.GET_ADDRESSES_SUCCESS,
      })),

  sendTransaction: (action$: ActionsObservable<ActionList['SEND_TRANSACTION']>) =>
    action$.ofType(ActionType.SEND_TRANSACTION)
      .mergeMap(({ payload: { amount, toAddress } }: ActionList['SEND_TRANSACTION']) =>
        Observable.fromPromise(ElectraJsMiddleware.wallet.send(amount, toAddress))
          .mapTo({ type: ActionType.SEND_TRANSACTION_SUCCESS })
          .catch((error: Error) => {
            console.error(error.message)

            return Observable.of({
              type: ActionType.SEND_TRANSACTION_ERROR,
            })
          }),
    ),

  submitTransaction: (action$: ActionsObservable<any>) =>
    action$.ofType(ActionType.SUBMIT_TRANSACTION)
      .mergeMap(({ payload: transaction }: ActionList['SUBMIT_TRANSACTION']) =>
        Observable.fromPromise(ElectraJsMiddleware.wallet.getBalance())
          .map(({ confirmed: confirmedBalance }: WalletBalance) => [transaction, confirmedBalance]),
      )
      .map(([transaction, confirmedBalance]: [Transaction, number]) => {
        if (transaction.toAddress.length === 0 || transaction.toAddress[0] !== 'E') {
          return {
            payload: {
              addressError: 'Invalid address.',
              amountError: undefined,
            },
            type: ActionType.SUBMIT_TRANSACTION_ERROR,
          }
        }

        // tslint:disable-next-line:no-magic-numbers
        if (isNaN(transaction.amount) || transaction.amount < 0.000_000_01) {
          return {
            payload: {
              addressError: undefined,
              amountError: 'Invalid amount.',
            },
            type: ActionType.SUBMIT_TRANSACTION_ERROR,
          }
        }

        // tslint:disable-next-line:no-magic-numbers
        if (transaction.amount > (confirmedBalance - 0.00001)) {
          return {
            payload: {
              addressError: undefined,
              amountError: 'Higher than your confirmed balance.',
            },
            type: ActionType.SUBMIT_TRANSACTION_ERROR,
          }
        }

        if (ElectraJsMiddleware.wallet.lockState !== 'UNLOCKED') {
          pendingTransaction = transaction

          return { type: ActionType.TOGGLE_UNLOCK_MODAL }
        }

        return {
          payload: transaction,
          type: ActionType.SEND_TRANSACTION,
        }
      }),
}
