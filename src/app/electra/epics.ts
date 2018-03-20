import ElectraJs from 'electra-js'
import { Store } from 'redux'
import { ActionsObservable } from 'redux-observable'
import { Observable } from 'rxjs'
import * as ElectraActionNames from './action-names'
<<<<<<< 62e938b84db98efc2ec330d34fde76ec13e78a64
import { GenerateHD, InitialElectra, StartDaemon, StopDaemon, StartDaemonSuccess, UnlockWallet, UnlockWalletSuccess } from './types'
=======
import { GenerateHD, InitialElectra, StartDaemon, StopDaemon, StartDaemonSuccess } from './types'
>>>>>>> add websocket

// should be loaded from a file
const config: any = {
  isHard: true
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

export function generateHD(action$ : ActionsObservable<GenerateHD | UnlockWalletSuccess> , store: Store<any>): any {
  return action$.ofType(ElectraActionNames.GENERATE_HARD_WALLET, ElectraActionNames.UNLOCK_WALLET_SUCCESS)
  .map(() => store.getState().electra.electraJs)
  .filter((electraJs: any) => electraJs)
  .map(async (electraJs: ElectraJs) => electraJs.wallet.generate()) // generate wallet
  .mergeMap((promise: Promise<any>) =>
  Observable
  .fromPromise(promise)
  .mergeMap(() =>
  Observable.of(
    { type: ElectraActionNames.GENERATE_HARD_WALLET_SUCCESS }
  )
)
.catch((error: Error) => {
  // tslint:disable-next-line:no-console
  console.log(error.message)
  
  return Observable.of({
    type: ElectraActionNames.GENERATE_HARD_WALLET_FAIL
  })})
)
}

export function startDaemon(action$ : ActionsObservable<StartDaemon> , store: Store<any>): any {
  return action$.ofType(ElectraActionNames.START_DAEMON)
  .map(() => store.getState().electra.electraJs)
  .filter((electraJs: any) => electraJs)
  .map(async (electraJs: ElectraJs) => electraJs.wallet.startDaemon())
  .mergeMap((promise: Promise<any>) =>
    Observable
    .fromPromise(promise)
    .mergeMap(() =>
      Observable.of(
        { type: ElectraActionNames.START_DAEMON_SUCCESS }
      )
    )
    .catch((error: Error) => {
      // tslint:disable-next-line:no-console
      console.log(error.message)

      return Observable.of({
      type: ElectraActionNames.START_DAEMON_FAIL
    })})
  )
}

<<<<<<< 62e938b84db98efc2ec330d34fde76ec13e78a64
export function stopDaemon(action$ : ActionsObservable<StopDaemon> , store: Store<any>): any {
  return action$.ofType(ElectraActionNames.STOP_DAEMON)
=======
export function generateHD(action$ : ActionsObservable<GenerateHD | StartDaemonSuccess> , store: Store<any>): any {
  return action$.ofType(ElectraActionNames.GENERATE_HARD_WALLET, ElectraActionNames.START_DAEMON_SUCCESS)
>>>>>>> add websocket
  .map(() => store.getState().electra.electraJs)
  .filter((electraJs: any) => electraJs)
  .map(async (electraJs: ElectraJs) => electraJs.wallet.stopDaemon())
  .mergeMap((promise: Promise<any>) =>
    Observable
    .fromPromise(promise)
    .mergeMap(() =>
      Observable.of(
        { type: ElectraActionNames.STOP_DAEMON_SUCCESS }
      )
    )
    .catch((error: Error) => {
      // tslint:disable-next-line:no-console
      console.log(error.message)

      return Observable.of({
      type: ElectraActionNames.STOP_DAEMON_FAIL
    })})
  )
}

export function unlockWallet(action$: ActionsObservable<UnlockWallet | StartDaemonSuccess>, store: Store<any>): any {
  return action$.ofType(ElectraActionNames.UNLOCK_WALLET, ElectraActionNames.START_DAEMON_SUCCESS)
  .map(() => store.getState().electra.electraJs)
  .filter((electraJs: any) => electraJs)
<<<<<<< 62e938b84db98efc2ec330d34fde76ec13e78a64
  .map(async (electraJs: ElectraJs) => electraJs.wallet.unlock(electraJs.wallet.mnemonic))
=======
  .map(async (electraJs: ElectraJs) => electraJs.wallet.stopDaemon())
>>>>>>> add websocket
  .mergeMap((promise: Promise<any>) =>
    Observable
    .fromPromise(promise)
    .mergeMap(() =>
      Observable.of(
        { type: ElectraActionNames.UNLOCK_WALLET_SUCCESS }
      )
    )
    .catch((error: Error) => {
      // tslint:disable-next-line:no-console
      console.log(error.message)

      return Observable.of({
      type: ElectraActionNames.UNLOCK_WALLET_FAIL
    })})
  )
}