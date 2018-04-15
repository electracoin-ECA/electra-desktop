import { WalletAddressCategory, WalletTransaction } from 'electra-js'
import { ActionsObservable } from 'redux-observable'
import 'rxjs/add/observable/of'
import { Observable } from 'rxjs/Observable'
import ElectraJsMiddleware from '../../middlewares/ElectraJs'
import * as OverviewActionNames from '../overview/action-names'
import * as TransactionActionNames from './action-names'
import { TransactionsActions } from './types'

const TRANSACTIONS_NUMBER = 100
// const GET_TRANSACTIONS_LOOP_INTERVAL = 5_000

let categoryCurrent: WalletAddressCategory | undefined

export function getTransactions(action$: ActionsObservable<TransactionsActions>, store: any):
  Observable<any> {
  return action$.ofType(TransactionActionNames.GET_TRANSACTIONS)
    .map(async ({ payload: category }: any) => {
      categoryCurrent = category

      return ElectraJsMiddleware.wallet.getTransactions(TRANSACTIONS_NUMBER, category)
    })
    .switchMap((promise: Promise<WalletTransaction[]>) =>
      Observable
        .fromPromise(promise)
        .flatMap((data: WalletTransaction[]) => [
          {
            payload: data,
            type: TransactionActionNames.GET_TRANSACTIONS_SUCCESS,
          },
          {
            payload: categoryCurrent,
            type: TransactionActionNames.GET_TRANSACTIONS_LOOP,
          },
        ])
        .catch((error: Error) => {
          console.error(error.message)

          return Observable.of({
            type: TransactionActionNames.GET_TRANSACTIONS,
          })
        }),
    )
}

// export const getWalletInfoLoop = (action$: ActionsObservable<any>) =>
//   action$.ofType(TransactionActionNames.GET_TRANSACTIONS_LOOP)
//     .delay(GET_TRANSACTIONS_LOOP_INTERVAL)
//     .flatMap(({ payload: category }: any) => {
//       if (categoryCurrent !== category) return []

//       return [{
//         payload: category,
//         type: TransactionActionNames.GET_TRANSACTIONS,
//       }]
//     })

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
