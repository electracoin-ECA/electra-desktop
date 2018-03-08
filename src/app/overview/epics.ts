import * as ActionNames from './action-names'
import { Store } from 'redux'

export function getGlobalBalance(action$: any, store: Store<any>) {
    return action$.ofType(ActionNames.GET_GLOBAL_BALANCE)
    .map(() => store.getState().electraReducer.electraJs)
    .filter((electraJs: any) => electraJs)
    .map((electraJs: any) => electraJs.webServices.getBalanceFor())
    .switchMap((promise: any) => {
      return new Promise((resolve) => {
        promise
        .then((balance: any) => {
          resolve({
            type: ActionNames.GET_GLOBAL_BALANCE_SUCCESS,
            globalBalance: balance
          })
        })
        .catch((err: any) => {
          resolve({
            type: ActionNames.GET_GLOBAL_BALANCE_FAIL
          })
        })
      })
    })
  }
