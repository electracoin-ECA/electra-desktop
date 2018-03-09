import ElectraJs from 'electra-js'
import { Store } from 'redux'
import { ActionsObservable } from 'redux-observable'
import { Observable } from 'rxjs'
import * as ActionNames from './action-names'
import { Config, GenerateHD, InitialElectra } from './types'

// should be loaded from a file
const config: Config = {
  rpcServerAuth: {
    username: 'user',
    // tslint:disable-next-line:object-literal-sort-keys
    password: 'pass'
  },
  rpcServerUri: 'http://127.0.0.1:5788'
}

export function initializeElectraEpic(action$ : ActionsObservable<InitialElectra> , store: Store<any>): any {
  return action$.ofType(ActionNames.INITIALIZE_ELECTRA)
    .map(() => new ElectraJs(config))
    .map((electraJs: any) => ({
      type: ActionNames.INITIALIZE_ELECTRA_SUCCESS,
      // tslint:disable-next-line:object-literal-sort-keys
      payload: {
        electraJs
      }
    }))
    // TODO: notify user to launch electra demon and rein
    .catch((error: Error) => Observable.of({
      type: ActionNames.INITIALIZE_ELECTRA_FAIL,
      // tslint:disable-next-line:object-literal-sort-keys
      payload: {
        error: error.toString()
      }
    }))
}

export function generateHDWallet(action$ : ActionsObservable<GenerateHD> , store: Store<any>): any {
  return action$.ofType(ActionNames.GENERATE_HARD_WALLET)
  .map(() => store.getState().electraReducer.electraJs)
  .filter((electraJs: any) => electraJs)
  .map((electraJs: any) => electraJs.wallet.generate()) // generate wallet
  .switchMap((promise: Promise<object>) =>
    // tslint:disable-next-line:typedef
    new Promise((resolve) => {
      promise
      .then(() => {
        resolve({
          type: ActionNames.GENERATE_HARD_WALLET_SUCCESS
        })
      })
      .catch((err: any) => {
        resolve({
          type: ActionNames.GENERATED_HARD_WALLET_FAIL
        })
      })
    }))
  .catch((err: any) =>
    Observable.of({
      type: ActionNames.GENERATED_HARD_WALLET_FAIL
    }))
}
