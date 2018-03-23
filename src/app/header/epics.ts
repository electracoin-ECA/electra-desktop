import ElectraJs, { WalletInfo } from 'electra-js'
import { ActionsObservable } from 'redux-observable'
import 'rxjs/add/observable/of'
import { Observable } from 'rxjs/Observable'
import * as ActionNames from './action-names'
import { HeaderActions, /*WalletInfoObservable*/ } from './types'

/**
 * TODO: If electraJs not exist try to reinitialize
 */

export function getWalletInfo(action$: ActionsObservable<HeaderActions>, store: any):
Observable<any> {
  return action$.ofType(ActionNames.GET_WALLET_INFO)
    .map(() => store.getState().electra.electraJs) // get electraJs object from the store
    .filter((electraJs: any) => electraJs) // check if electraJs exists
    .map(async (electraJs: ElectraJs) => electraJs.wallet.getInfo())
    .mergeMap((promise: Promise<WalletInfo>) =>
      Observable
        .fromPromise(promise)
        .map((data: WalletInfo) => ({
          payload: { ...data },
          type: ActionNames.GET_WALLET_INFO_SUCCESS
        }))
        .catch((error: Error) => {
          console.error(error.message)

          return Observable.of({
          type: ActionNames.GET_WALLET_INFO_FAIL
        })})
    )
}
