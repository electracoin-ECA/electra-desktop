import { Store } from 'redux'
import { ActionsObservable } from 'redux-observable'
import { Observable } from 'rxjs/Observable'
import * as ActionNames from './action-names'
import { OverviewActions } from './types'

export function getGlobalBalance(action$: ActionsObservable<OverviewActions>, store: Store<any>): any {
    return action$.ofType(ActionNames.GET_GLOBAL_BALANCE)
    .map(() => store.getState().electra.electraJs)
    .filter((electraJs: any) => electraJs)
    .map(async (electraJs: any) => electraJs.wallet.getBalance())
    // tslint:disable-next-line:typedef
    .switchMap(async (promise: any) => new Promise((resolve) => {
      promise
        .then((globalBalance: any) => {
          resolve({
              globalBalance,
              type: ActionNames.GET_GLOBAL_BALANCE_SUCCESS
            }
          )
        })
        .catch((err: any) => {
          resolve({
            type: ActionNames.GET_GLOBAL_BALANCE_FAIL
          })
        })
    }))
    .catch((err: any) =>
      Observable.of({
        type: ActionNames.GET_GLOBAL_BALANCE_FAIL
      }))
  }
