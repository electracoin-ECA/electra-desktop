import ElectraJs from 'electra-js'
import { Store } from 'redux'
import { ActionsObservable } from 'redux-observable'
import { Observable } from 'rxjs'
import * as ElectraActionNames from './action-names'
import * as OverviewActionsNames from './../overview/action-names'
import { GenerateHD, InitialElectra, StartDaemon, StopDaemon } from './types'

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

export function startDaemon(action$ : ActionsObservable<StartDaemon> , store: Store<any>): any {
  return action$.ofType(ElectraActionNames.START_DAEMON)
  .map(() => store.getState().electra.electraJs)
  .filter((electraJs: any) => electraJs)
  .map(async (electraJs: ElectraJs) => electraJs.wallet.startDeamon()) 
  .mergeMap((promise: Promise<any>) =>
    Observable
    .fromPromise(promise)
    .mergeMap(() =>
      Observable.of(
        { type: ElectraActionNames.START_DAEMON_SUCCESS }
      )
    )
    .catch((error: Error) => {
      console.log(error.message)
      return Observable.of({
      type: ElectraActionNames.START_DAEMON_FAIL
    })})
  )
}


export function generateHD(action$ : ActionsObservable<GenerateHD> , store: Store<any>): any {
  return action$.ofType(ElectraActionNames.GENERATE_HARD_WALLET)
  .map(() => store.getState().electra.electraJs)
  .filter((electraJs: any) => electraJs)
  .map(async (electraJs: ElectraJs) => electraJs.wallet.generate()) // generate wallet
  .mergeMap((promise: Promise<any>) =>
    Observable
    .fromPromise(promise)
    .mergeMap(() =>
      Observable.of(
        { type: ElectraActionNames.GENERATE_HARD_WALLET_SUCCESS },
        { type: OverviewActionsNames.GET_GLOBAL_BALANCE }
      )
    )
    .catch((error: Error) => {
      console.log(error.message)
      return Observable.of({
      type: ElectraActionNames.GENERATE_HARD_WALLET_FAIL
    })})
  )
}

export function stopDaemon(action$ : ActionsObservable<StopDaemon> , store: Store<any>): any {
  return action$.ofType(ElectraActionNames.STOP_DAEMON)
  .map(() => store.getState().electra.electraJs)
  .filter((electraJs: any) => electraJs)
  .map(async (electraJs: ElectraJs) => electraJs.wallet.stopDeamon())
  .mergeMap((promise: Promise<any>) =>
    Observable
    .fromPromise(promise)
    .mergeMap(() =>
      Observable.of(
        { type: ElectraActionNames.STOP_DAEMON_SUCCESS }
      )
    )
    .catch((error: Error) => {
      console.log(error.message)
      return Observable.of({
      type: ElectraActionNames.STOP_DAEMON_FAIL
    })})
  )
}
