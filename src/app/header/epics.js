import * as AN from './action-names'
import { receivedStakingInfo } from './actions'

/** TODO:
 *  Import ElectraJs Object
 *  Get the current staking calculated data;
*/
export function getStakingInfo (action$, store) {
  if (action$.ofType(AN.GET_STAKING_INFO)) {
    const stakingInfo = await ElectronWindow.Apis.electraJs.wallet.getStakingInfo()
    receivedStakingInfo(stakingInfo)
  }
}
