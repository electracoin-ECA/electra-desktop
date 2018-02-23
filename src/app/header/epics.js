import * as AN from './action-names'
/** TODO:
 *  Import ElectraJs Object
 *  Get the current staking calculated data;
*/
export function getStakingInfo (action$, store) {
  const stakingInfo = await ElectronWindow.Apis.electraJs.wallet.getStakingInfo()
  const { networkWeight, nextRewardIn, weight} = stakingInfo
  return {
    type: AN.RECEIVED_STAKING_INFO,
    payload: {
      networkWeight,
      nextRewardIn,
      weight
    }
  }
}
