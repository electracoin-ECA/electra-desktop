import { Store } from 'redux'
import { ActionsObservable } from 'redux-observable'
import { Observable } from 'rxjs/Observable'
import * as ActionNames from './action-names'
import { OverviewActions } from './types'

const MAX_DECIMAL_PLACES: number = 8

export function getGlobalBalance(action$: ActionsObservable<OverviewActions>, store: Store<any>): any {
  return action$.ofType(ActionNames.GET_GLOBAL_BALANCE)
    .map(() => store.getState().electra.electraJs)
    .filter((electraJs: any) => electraJs)
    .map(async (electraJs: any) => electraJs.wallet.getBalance())
    .mergeMap((promise: Promise<any>) =>
      Observable
        .fromPromise(promise)
        .map((globalBalance: number) => ({ globalBalance, type: ActionNames.GET_GLOBAL_BALANCE_SUCCESS }))
        .catch((error: Error) => Observable.of({
          type: ActionNames.GET_GLOBAL_BALANCE_FAIL
        }))
    )
}

export function getCurrentPriceUSD(action$: ActionsObservable<OverviewActions>, store: Store<any>): any {
  return action$.ofType(ActionNames.GET_CURRENT_PRICE_USD)
    .map(() => store.getState().electra.electraJs)
    .filter((electraJs: any) => electraJs)
    .map(async (electraJs: any) => electraJs.webServices.getCurrentPriceIn())
    .mergeMap((promise: Promise<any>) =>
      Observable
        .fromPromise(promise)
        .map((currentPriceUSD: number) => ({
          currentPriceUSD: currentPriceUSD.toFixed(MAX_DECIMAL_PLACES),
          type: ActionNames.GET_CURRENT_PRICE_USD_SUCCESS,
        }))
        .catch((error: Error) => Observable.of({
          type: ActionNames.GET_CURRENT_PRICE_USD_FAIL
        }))
    )
}

export function getCurrentPriceBTC(action$: ActionsObservable<OverviewActions>, store: Store<any>): any {
  return action$.ofType(ActionNames.GET_CURRENT_PRICE_BTC)
    .map(() => store.getState().electra.electraJs)
    .filter((electraJs: any) => electraJs)
    .map(async (electraJs: any) => electraJs.webServices.getCurrentPriceIn('btc'))
    .mergeMap((promise: Promise<any>) =>
      Observable
        .fromPromise(promise)
        .map((currentPriceBTC: number) => ({
          currentPriceBTC: currentPriceBTC.toFixed(MAX_DECIMAL_PLACES),
          type: ActionNames.GET_CURRENT_PRICE_BTC_SUCCESS
        }))
        .catch((error: Error) => Observable.of({
          type: ActionNames.GET_CURRENT_PRICE_BTC_FAIL
        }))
    )
}
