import ElectraJs, { WalletTransaction } from 'electra-js'
import { ActionsObservable } from 'redux-observable'
import 'rxjs/add/observable/of'
import { Observable } from 'rxjs/Observable'
import * as ElectraActionNames from './../electra/action-names'
import { ElectraActions } from './../electra/types'
import * as TransactionActionNames from './action-names'
import { TransactionsActions } from './types'

const TRANSACTIONS_NUMBER: number = 100
const DELAY: number = 1000

export function getTransactions(action$: ActionsObservable<TransactionsActions | ElectraActions>, store: any):
  Observable<any> {
  return action$.ofType(TransactionActionNames.GET_TRANSACTIONS, ElectraActionNames.GENERATE_HARD_WALLET_SUCCESS)
    .map(() => store.getState().electra.electraJs)
    .filter((electraJs: any) => electraJs)
    .map(async (electraJs: ElectraJs) => electraJs.wallet.getTransactions(TRANSACTIONS_NUMBER))
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
