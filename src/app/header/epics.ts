import { WalletInfo } from 'electra-js'
import { ActionsObservable } from 'redux-observable'
import 'rxjs/add/observable/of'
import { Observable } from 'rxjs/Observable'
import ElectraJsMiddleware from '../../middlewares/ElectraJs'
import * as ActionNames from './action-names'
import { HeaderActions, /*WalletInfoObservable*/ } from './types'

export function getWalletInfo(action$: ActionsObservable<HeaderActions>, store: any):
Observable<any> {
  return action$.ofType(ActionNames.GET_WALLET_INFO)
    .map(async () => ElectraJsMiddleware.getInfo())
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
