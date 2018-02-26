import { Observable } from 'rxjs/Observable'
import * as ActionNames from './action-names'
import {ElectraActions} from '../electra'
/**
 * TODO: If electraJs not exist try to reinitialize
*/

export function getStakingInfo (action$, store) {
  return action$.ofType(ActionNames.GET_STAKING_INFO)
    .map(() => store.getState().electraReducer.electraJs) // get electraJs object from the store
    .filter(electraJs => electraJs) // check if electraJs exists
    .map(electraJs =>  electraJs.wallet.getStakingInfo())
    .switchMap(promise => {
      return new Promise((resolve) => {
        promise
          .then(data => {
            resolve({
              type: ActionNames.RECEIVED_STAKING_INFO,
               payload: {
                 ...data
               }
            })
          })
          .catch (err => {
            console.log(err)
            resolve({
              type: ActionNames.FAILED_TO_RETRIEVE_STAKING_INFO
            })
          })
      })
    })
    .catch (err => {
      return Observable.of({
        type: ActionNames.FAILED_TO_RETRIEVE_STAKING_INFO
      })
    })
}
