import { WalletAddressCategory, WalletTransaction } from 'electra-js'
import { ActionsObservable } from 'redux-observable'
import 'rxjs/add/observable/of'
import { Observable } from 'rxjs/Observable'
import ElectraJsMiddleware from '../../middlewares/ElectraJs'
import * as OverviewActionNames from '../overview/action-names'
import * as TransactionActionNames from './action-names'
import { TransactionsActions } from './types'

const TRANSACTIONS_NUMBER = 10

let currentCategory: WalletAddressCategory | undefined
let lastCategory: WalletAddressCategory | undefined
let lastTransactionConfirmationsCount: number
let lastTransactionHash: string

export function getTransactions(action$: ActionsObservable<TransactionsActions>, store: any):
  Observable<any> {
  return action$.ofType(TransactionActionNames.GET_TRANSACTIONS)
    .map(async ({ payload: category }: any) => {
      currentCategory = category

      return ElectraJsMiddleware.wallet.getTransactions(TRANSACTIONS_NUMBER, category)
    })
    .switchMap((promise: Promise<WalletTransaction[]>) =>
      Observable
        .fromPromise(promise)
        .flatMap((transactions: WalletTransaction[]) => {
          if (
            currentCategory === lastCategory && (
              transactions.length !== 0 &&
              transactions[0].hash === lastTransactionHash &&
              transactions[0].confimationsCount === lastTransactionConfirmationsCount ||
              transactions.length === 0 &&
              lastTransactionHash === '' &&
              lastTransactionConfirmationsCount === -1
            )
          ) {
            return []
          }

          lastTransactionHash = transactions.length !== 0 ? transactions[0].hash : ''
          lastTransactionConfirmationsCount = transactions.length !== 0 ? transactions[0].confimationsCount : -1
          lastCategory = currentCategory

          return [
            {
              payload: transactions,
              type: TransactionActionNames.GET_TRANSACTIONS_SUCCESS,
            },
          ]
        })
        .catch((error: Error) => {
          console.error(error.message)

          return Observable.of({
            type: TransactionActionNames.GET_TRANSACTIONS,
          })
        }),
    )
}

const MAX_DELAY = 500
export function getTransaction(action$: ActionsObservable<TransactionsActions>, store: any):
  Observable<any> {
  return action$.ofType(TransactionActionNames.GET_TRANSACTION)
    .debounceTime(MAX_DELAY)
    .map((action: any) => ({
      payload: action.payload,
    }))
    .map(async (data: any) => ElectraJsMiddleware.wallet.getTransaction(data.payload))
    .switchMap((promise: any) =>
      Observable
        .fromPromise(promise)
        .flatMap((data: any) => {
          // tslint:disable-next-line
          new Notification('New Transaction', { body: `Incoming transaction of ${data.amount} ECA` })

          return Observable.of(
            { type: TransactionActionNames.GET_TRANSACTIONS },
            { type: OverviewActionNames.GET_GLOBAL_BALANCE },
          )
        })
        .catch((error: Error) => {
          console.error(error.message)

          return Observable.of({
            type: TransactionActionNames.GET_TRANSACTIONS_FAIL,
          })
        }),
    )
}
