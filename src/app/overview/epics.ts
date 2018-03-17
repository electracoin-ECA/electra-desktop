import { Store } from 'redux'
import { ActionsObservable } from 'redux-observable'
import { Observable } from 'rxjs/Observable'
import * as ActionNames from './action-names'
import { GlobalBalanceObservable, GlobalBalanceOtherObservable, OverviewActions } from './types'
import ElectraJs from 'electra-js'

const MAX_DECIMAL_PLACES: number = 8
const BTC = "BTC"

export function getGlobalBalance(action$: ActionsObservable<OverviewActions>, store: Store<any>):
  Observable<GlobalBalanceObservable> {
    return action$.ofType(ActionNames.GET_GLOBAL_BALANCE)
      .map(() => store.getState().electra.electraJs)
      .filter((electraJs: any) => electraJs)
      .map(async (electraJs: ElectraJs) => electraJs.wallet.getBalance())
      .mergeMap((promise: Promise<number>) =>
      Observable
      .fromPromise(promise)
      .map((globalBalance: number) => ({
        payload: globalBalance,
        type: ActionNames.GET_GLOBAL_BALANCE_SUCCESS
      }))
      .catch((error: Error) => {
        console.log(error.message)
        return Observable.of({
        type: ActionNames.GET_GLOBAL_BALANCE_FAIL
      })
    })
  )
}

export function getCurrentPriceUSD(action$: ActionsObservable<OverviewActions>, store: Store<any>):
  Observable<GlobalBalanceOtherObservable> {
    return action$.ofType(ActionNames.GET_CURRENT_PRICE_USD)
    .map(() => store.getState().electra.electraJs)
    .filter((electraJs: any) => electraJs)
    .map(async (electraJs: ElectraJs) => electraJs.webServices.getCurrentPriceIn())
    .mergeMap((promise: Promise<number>) =>
      Observable
        .fromPromise(promise)
        .map((currentPriceUSD: number) => ({
          payload: currentPriceUSD.toFixed(MAX_DECIMAL_PLACES),
          type: ActionNames.GET_CURRENT_PRICE_USD_SUCCESS
        }))
        .catch((error: Error) => Observable.of({
          type: ActionNames.GET_CURRENT_PRICE_USD_FAIL
        })
      )
    )
}

export function getCurrentPriceBTC(action$: ActionsObservable<OverviewActions>, store: Store<any>):
  Observable<GlobalBalanceOtherObservable> {
    return action$.ofType(ActionNames.GET_CURRENT_PRICE_BTC)
    .map(() => store.getState().electra.electraJs)
    .filter((electraJs: any) => electraJs)
    .map(async (electraJs: ElectraJs) => electraJs.webServices.getCurrentPriceIn(BTC))
    .mergeMap((promise: Promise<number>) =>
      Observable
        .fromPromise(promise)
        .map((currentPriceBTC: number) => ({
          payload: currentPriceBTC.toFixed(MAX_DECIMAL_PLACES),
          type: ActionNames.GET_CURRENT_PRICE_BTC_SUCCESS
        }))
        .catch((error: Error) => Observable.of({
          type: ActionNames.GET_CURRENT_PRICE_BTC_FAIL
        })
      )
    )
}
