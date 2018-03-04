import { Observable } from 'rxjs/Observable'
import * as ActionNames from './action-names'
import 'rxjs/add/observable/of';

/**
 * TODO: If electraJs not exist try to reinitialize
*/

export function getStakingInfo(action$: any, store: any) {
  return action$.ofType(ActionNames.GET_STAKING_INFO)
    .map(() => store.getState().electraReducer.electraJs) // get electraJs object from the store
    .filter((electraJs: any) => electraJs) // check if electraJs exists
    .map((electraJs: any) => electraJs.wallet.getStakingInfo())
    .switchMap((promise: any) => {
      return new Promise((resolve) => {
        promise
          .then((data: any) => {
            resolve({
              type: ActionNames.SUCCESSFULLY_RETRIEVED_STAKING_INFO,
              payload: {
                ...data
              }
            })
          })
          .catch((err: any) => {
            resolve({
              type: ActionNames.FAILED_TO_RETRIEVE_STAKING_INFO
            })
          })
      })
    })
    .catch((err: any) => {
      return Observable.of({
        type: ActionNames.FAILED_TO_RETRIEVE_STAKING_INFO
      })
    })
}
