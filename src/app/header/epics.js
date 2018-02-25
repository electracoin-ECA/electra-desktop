import { Observable } from 'rxjs/Observable'
import * as ActionNames from './action-names'
import {ElectraActions} from '../electra'
/**
 * TODO: If electraJs not exist try to reinitialize
*/


export function getStakingInfo (action$, store) {
  return action$.ofType(ActionNames.GET_STAKING_INFO)
  .map(() => {
    console.log('reachhhhhh map')
    store.getState().electraReducer.electraJs}) // get electraJs object from the store
  //.filter(electraJs => electraJs) // check if electraJs exists
  .map(electraJs => electraJs.getStakingInfo()) // get staking info
  .switchMap(stakingInfo => {
    return stakingInfo
    .then(data => ({
        type: ActionNames.RECEIVED_STAKING_INFO,
        payload: {
          ...data
        }
      })
  )})
  .catch (err => {
    console.log('react here')
    return Observable.of({
      type: ActionNames.FAILED_TO_RETRIEVE_STAKING_INFO
    })
  })
}
