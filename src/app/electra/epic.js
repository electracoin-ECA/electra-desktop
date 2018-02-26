import ElectraJs from 'electra-js'
import { Observable } from 'rxjs/Observable'
import * as ActionNames from './action-names'

// should be loaded from a file
const config = {
  rpcServerAuth: {
    username: 'user',
    password: 'pass'
  },
  rpcServerUri: 'http://127.0.0.1:5788'
}

export function initializeElectraEpic (action$, store) {
  return action$.ofType(ActionNames.INITIALIZE_ELECTRA)
    .map(() => new ElectraJs(config))
    .map(electraJs => ({
      type: ActionNames.INITIALIZE_ELECTRA_SUCCESS,
      payload: {
        electraJs
      }
    }))
    // TODO: notify user to launch electra demon and rein
    .catch(error => Observable.of({
      type: ActionNames.INITIALIZE_ELECTRA_FAIL,
      payload: {
        error: error.toString()
      }
    }))
}

export function generateHDWallet(action$, store) {
  return action$.ofType(ActionNames.GENERATE_HARD_WALLET)
  .map(() => store.getState().electraReducer.electraJs)
  .filter(electraJs => electraJs)
  .map(electraJs => electraJs.wallet.generate()) // generate wallet
  .switchMap(promise => {
    return new Promise((resolve) => {
      promise
      .then(() => {
        resolve({
          type: ActionNames.SUCCESSFULLY_GENERATED_HARD_WALLET
        })
      })
      .catch(err => {
        console.log(err)
        resolve({
          type: ActionNames.FAILED_T0_GENERATE_HARD_WALLET
        })
      })
    })
  })
  .catch(err => {
    console.log(err)
    return Observable.of({
      type: ActionNames.FAILED_T0_GENERATE_HARD_WALLET
    })
  })
}
