import { WalletAddressCategory, WalletBalance } from 'electra-js'
import { ActionsObservable, ofType } from 'redux-observable'
import { from, of } from 'rxjs'
import { catchError, flatMap, map, mapTo, mergeMap } from 'rxjs/operators'

import ElectraJsMiddleware from '../../middlewares/ElectraJs'
import { ActionList as UnlockModalActionsList, ActionType as UnlockModalActionType } from '../common/unlock-modal/types'
import { ActionList, ActionType, Transaction } from './types'

let pendingTransaction: Transaction | undefined
const PURSE_AMOUNT_MAX = 100
const TRANSACTION_FEE = 0.000_01

export default {
  closeUnlockModal: (action$: ActionsObservable<UnlockModalActionsList['CANCEL_UNLOCK_MODAL']>) =>
    action$.pipe(
      ofType(UnlockModalActionType.CANCEL_UNLOCK_MODAL),
      mapTo({ type: ActionType.TOGGLE_UNLOCK_MODAL }),
    ),

  closeUnlockModalAndSendTransaction: (action$: ActionsObservable<
    UnlockModalActionsList['SET_LOCK_TO_UNLOCKED_SUCCESS']>,
  ) =>
    action$.pipe(
      ofType(UnlockModalActionType.SET_LOCK_TO_UNLOCKED_SUCCESS),
      flatMap(() => {
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
    ),

  sendTransaction: (action$: ActionsObservable<ActionList['SEND_TRANSACTION']>) =>
    action$.pipe(
      ofType(ActionType.SEND_TRANSACTION),
      mergeMap(({ payload: { amount, fromCategory: category, toAddress } }: ActionList['SEND_TRANSACTION']) =>
        from(ElectraJsMiddleware.wallet.send(amount + TRANSACTION_FEE, category, toAddress)).pipe(
          mapTo({ type: ActionType.SEND_TRANSACTION_SUCCESS }),
          catchError((error: Error) => {
            console.error(error.message)

            return of({
              type: ActionType.SEND_TRANSACTION_ERROR,
            })
          }),
        ),
      ),
    ),

  submitTransaction: (action$: ActionsObservable<any>) =>
    action$.pipe(
      ofType(ActionType.SUBMIT_TRANSACTION),
      mergeMap(({ payload: transaction }: ActionList['SUBMIT_TRANSACTION']) =>
        from(ElectraJsMiddleware.wallet.getCategoryBalance(transaction.fromCategory)).pipe(
          map(({ confirmed: confirmedBalance }: WalletBalance) => [transaction, confirmedBalance]),
        ),
      ),
      map(([transaction, confirmedBalance]: [Transaction, number]) => {
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

        const toCategory: WalletAddressCategory = ElectraJsMiddleware.wallet.getAddressCategory(transaction.toAddress)

        if (toCategory === 0 && transaction.amount > PURSE_AMOUNT_MAX) {
          return {
            payload: {
              addressError: undefined,
              amountError: `You can't send more than ${PURSE_AMOUNT_MAX} ECAs to your Purse.`,
            },
            type: ActionType.SUBMIT_TRANSACTION_ERROR,
          }
        }

        if (transaction.amount > (confirmedBalance - TRANSACTION_FEE)) {
          return {
            payload: {
              addressError: undefined,
              amountError: 'Higher than your available balance.',
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
    ),
}
