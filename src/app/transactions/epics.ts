import ElectraJs from 'electra-js'
import { WalletTransaction } from 'electra-js/dist/wallet/types'
import { ActionsObservable } from 'redux-observable'
import 'rxjs/add/observable/of'
import { Observable } from 'rxjs/Observable'
import * as ActionNames from './action-names'
import { TransactionsActions } from './types'

const TRANSACTIONS_NUMBER: number = 100

export function getTransactions(action$: ActionsObservable<TransactionsActions>, store: any):
  Observable<any> {
  return action$.ofType(ActionNames.GET_TRANSACTIONS)
    .map(() => store.getState().electra.electraJs)
    .filter((electraJs: any) => electraJs)
    .map(async (electraJs: ElectraJs) => electraJs.wallet.rpc.listTransactions('*', TRANSACTIONS_NUMBER))
    .mergeMap((promise: Promise<WalletTransaction[]>) =>
      Observable
        .fromPromise(promise)
        .map((data: WalletTransaction[]) => ({
            payload: data,
            type: ActionNames.GET_TRANSACTIONS_SUCCESS
          }
        ))
        .catch((error: Error) => {
          console.log(error.message)

          return Observable.of({
            type: ActionNames.GET_TRANSACTIONS_FAIL
          })
        })
    )
}
