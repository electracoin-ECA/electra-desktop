import { WalletTransaction } from 'electra-js'
import { ActionsObservable } from 'redux-observable'
import 'rxjs/add/observable/of'
import { Observable } from 'rxjs/Observable'
import ElectraJsMiddleware from '../../middlewares/ElectraJs'
import * as TransactionActionNames from './action-names'
import { TransactionsActions } from './types'

const DELAY: number = 1000

export function getTransactions(action$: ActionsObservable<TransactionsActions>, store: any):
  Observable<any> {
  return action$.ofType(TransactionActionNames.GET_TRANSACTIONS)
    .map(async () => ElectraJsMiddleware.getTransactions())
    .debounceTime(DELAY)
    .switchMap((promise: Promise<WalletTransaction[]>) =>
      Observable
        .fromPromise(promise)
        .map((data: WalletTransaction[]) => ({
            payload: data,
            type: TransactionActionNames.GET_TRANSACTIONS_SUCCESS
          }
        ))
        .catch((error: Error) => {
          console.error(error.message)

          return Observable.of({
            type: TransactionActionNames.GET_TRANSACTIONS
          })
        })
    )
}
