import ElectraJs from 'electra-js'
import { Store } from 'redux'
import { ActionsObservable } from 'redux-observable'
import { Observable } from 'rxjs'
import * as OverviewActionNames from './../overview/action-names'
import * as ElectraActionNames from './action-names'
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
  return action$.ofType(ElectraActionNames.INITIALIZE_ELECTRA)
    .map(() => new ElectraJs(config))
    .map((electraJs: any) => ({
      type: ElectraActionNames.INITIALIZE_ELECTRA_SUCCESS,
      // tslint:disable-next-line:object-literal-sort-keys
      payload: {
        electraJs
      }
    }))
    // TODO: notify user to launch electra demon and rein
    .catch((error: Error) => Observable.of({
      type: ElectraActionNames.INITIALIZE_ELECTRA_FAIL,
      // tslint:disable-next-line:object-literal-sort-keys
      payload: {
        error: error.toString()
      }
    }))
}

export function generateHDWallet(action$ : ActionsObservable<GenerateHD> , store: Store<any>): any {
  return action$.ofType(ElectraActionNames.GENERATE_HARD_WALLET)
  .map(() => store.getState().electra.electraJs)
  .filter((electraJs: any) => electraJs)
  .map(async (electraJs: any) => electraJs.wallet.generate()) // generate wallet
  .mergeMap((promise: Promise<any>) =>
    Observable
    .fromPromise(promise)
    .mergeMap(() =>
      Observable.of(
        { type: ElectraActionNames.GENERATE_HARD_WALLET_SUCCESS },
        { type: OverviewActionNames.GET_GLOBAL_BALANCE }
      )
    )
    .catch((error: Error) => Observable.of({
      type: ElectraActionNames.GENERATE_HARD_WALLET_FAIL
    }))
  )
}
