import { ActionsObservable } from 'redux-observable'
import 'rxjs/add/observable/of'
import { Observable } from 'rxjs/Observable'
import * as ActionNames from './action-names'
import { StakingActions, WalletStakingInfo } from './types'

/**
 * TODO: If electraJs not exist try to reinitialize
 */

export function getStakingInfo(action$: ActionsObservable<StakingActions>, store: any): any {
  return action$.ofType(ActionNames.GET_STAKING_INFO)
    .map(() => store.getState().electra.electraJs) // get electraJs object from the store
    .filter((electraJs: any) => electraJs) // check if electraJs exists
    .map((electraJs: any) => electraJs.wallet.getStakingInfo())
    // tslint:disable-next-line:typedef
    .switchMap((promise: any) => new Promise((resolve) => {
      promise
        .then((data: WalletStakingInfo) => {
          resolve({
            payload: {
              ...data
            },
            type: ActionNames.GET_STAKING_INFO_SUCCESS
          })
        })
        .catch((err: any) => {
          resolve({
            type: ActionNames.GET_STAKING_INFO_FAIL
          })
        })
      })
    )
    .catch((err: any) =>
      Observable.of({
        type: ActionNames.GET_STAKING_INFO_FAIL
      }))
}
