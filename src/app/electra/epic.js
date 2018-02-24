import ElectraJs from 'electra-js'
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
    .map(action => new ElectraJs(config))

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
