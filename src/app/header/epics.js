import { Observable } from 'rxjs/Observable'
import * as AN from './action-names'
import { receivedStakingInfo } from './actions'

export function getStakingInfo (action$, store) {
  console.log('in getstakinginfo epics')
  return action$.ofType(AN.GET_STAKING_INFO)
  .map(action => ElectronWindow.Apis.wallet.getStakingInfo())
  .switchMap(stakingInfo => {
    return stakingInfo
    .then(data => {
      return {
        type: AN.RECEIVED_STAKING_INFO,
        payload: {
          ...data
        }
      }
    })
  })
  .catch (err => Observable.of({
      type: AN.FAILED_TO_RETRIEVE_STAKING_INFO
    })
  )
}
