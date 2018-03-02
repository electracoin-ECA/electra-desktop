import ElectraJs from 'electra-js'
import * as ActionNames from './action-names'
import { Observable } from 'rxjs';
import { Store } from 'redux'

// should be loaded from a file
const config = {
  rpcServerAuth: {
    username: 'user',
    password: 'pass'
  },
  rpcServerUri: 'http://127.0.0.1:5788'
}
export function initializeElectraEpic (action$ : any , store: Store<any>) {
  return action$.ofType(ActionNames.INITIALIZE_ELECTRA)
    .map(() => new ElectraJs(config))
    .map(( electraJs: any) => ({
      type: ActionNames.INITIALIZE_ELECTRA_SUCCESS,
      payload: {
        electraJs
      }
    }))
    // TODO: notify user to launch electra demon and rein
    .catch((error: any) => Observable.of({
      type: ActionNames.INITIALIZE_ELECTRA_FAIL,
      payload: {
        error: error.toString()
      }
    }))
}

export function generateHDWallet(action$ : any , store: Store<any>) {
  return action$.ofType(ActionNames.GENERATE_HARD_WALLET)
  .map(() => store.getState().electraReducer.electraJs)
  .filter((electraJs: any) => electraJs)
  .map((electraJs: any) => electraJs.wallet.generate()) // generate wallet
  .switchMap((promise: any) => {
    return new Promise((resolve) => {
      promise
      .then(() => {
        resolve({
          type: ActionNames.SUCCESSFULLY_GENERATED_HARD_WALLET
        })
      })
      .catch((err: any) => {
        resolve({
          type: ActionNames.FAILED_T0_GENERATE_HARD_WALLET
        })
      })
    })
  })
  .catch((err: any) => {
    return Observable.of({
      type: ActionNames.FAILED_T0_GENERATE_HARD_WALLET
    })
  })
}
