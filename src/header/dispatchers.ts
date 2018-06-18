import { ActionList, ActionType, Dispatchers } from './types'

const dispatchers: Dispatchers = {
  getWalletInfo: (): ActionList['GET_WALLET_INFO'] =>
    ({ type: ActionType.GET_WALLET_INFO }),
}

export default dispatchers
