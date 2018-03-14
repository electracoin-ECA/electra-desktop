import ElectraJs from 'electra-js'
import { WalletInfo } from 'electra-js/dist/wallet/types'
import * as moment from 'moment'
import { ActionsObservable } from 'redux-observable'
import 'rxjs/add/observable/of'
import { Observable } from 'rxjs/Observable'
import * as ActionNames from './action-names'
import { GetLastBlockTimestampSuccess, HeaderActions, LatestBlockInfo } from './types'

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
        .catch((error: Error) => Observable.of({
          type: ActionNames.GET_WALLET_INFO_FAIL
        }))
    )
}

export function getLastBlockTimestamp(action$: ActionsObservable<HeaderActions>, store: any): any {
  return action$.ofType(ActionNames.GET_LAST_BLOCK_TIMESTAMP)
    .map(() => store.getState().electra.electraJs)
    .filter((electraJs: any) => electraJs)
    .map(async (electraJs: any) => electraJs.wallet.getLatestBlockInfo())
    .mergeMap((promise: Promise<object>) =>
      Observable
        .fromPromise(promise)
        .map((latestBlockInfo: LatestBlockInfo): GetLastBlockTimestampSuccess => ({
          payload: moment.unix(latestBlockInfo.time).fromNow(),
          type: ActionNames.GET_LAST_BLOCK_TIMESTAMP_SUCCESS
        }))
        .catch((error: Error) => Observable.of({
          type: ActionNames.GET_LAST_BLOCK_TIMESTAMP_FAIL
        }))
    )
}
