import { ActionsObservable } from 'redux-observable'
import 'rxjs/add/observable/of'
import { Observable } from 'rxjs/Observable'
import * as ActionNames from './action-names'
import { ConnectionCountObservable,
        HeaderActions,
        StakingInfoObservable,
        WalletStakingInfo } from './types'

/**
 * TODO: If electraJs not exist try to reinitialize
 */

export function getStakingInfo(action$: ActionsObservable<HeaderActions>, store: any):
Observable<StakingInfoObservable> {
  return action$.ofType(ActionNames.GET_STAKING_INFO)
    .map(() => store.getState().electra.electraJs) // get electraJs object from the store
    .filter((electraJs: any) => electraJs) // check if electraJs exists
    .map(async (electraJs: any) => electraJs.wallet.getStakingInfo())
    .mergeMap((promise: Promise<WalletStakingInfo>) =>
      Observable
        .fromPromise(promise)
        .map((data: WalletStakingInfo) => ({
          payload: { ...data },
          type: ActionNames.GET_STAKING_INFO_SUCCESS
        }))
        .catch((error: Error) => {
          console.log(error.message)
          return Observable.of({
          type: ActionNames.GET_STAKING_INFO_FAIL
        })})
    )
}

export function getConnectionsCount(action$: ActionsObservable<HeaderActions>, store: any):
Observable<ConnectionCountObservable> {
  return action$.ofType(ActionNames.GET_CONNECTIONS_COUNT)
    .map(() => store.getState().electra.electraJs)
    .filter((electraJs: any) => electraJs)
    .map(async (electraJs: any) => electraJs.wallet.getConnectionsCount())
    .mergeMap((promise: Promise<number>) =>
      Observable
        .fromPromise(promise)
        .map((connectionsCount: number) => ({
          payload: connectionsCount,
          type: ActionNames.GET_CONNECTIONS_COUNT_SUCCESS
        }))
        .catch((error: Error) => Observable.of({
          type: ActionNames.GET_CONNECTIONS_COUNT_FAIL
        }))
    )
}

export function getBlockCount(action$: ActionsObservable<HeaderActions>, store: any): any {
  return action$.ofType(ActionNames.GET_BLOCK_COUNT)
    .map(() => store.getState().electra.electraJs)
    .filter((electraJs: any) => electraJs)
    .map(async (electraJs: any) => electraJs.wallet.getBlockCount())
    .mergeMap((promise: Promise<number>) =>
      Observable
        .fromPromise(promise)
        .map((blockCount: number) => ({
          payload: blockCount,
          type: ActionNames.GET_BLOCK_COUNT_SUCCESS
        }))
        .catch((error: Error) => {
          console.log(error.message)
          return Observable.of({
          type: ActionNames.GET_BLOCK_COUNT_FAIL
        })})
    )
}
