import * as ActionNames from './action-names'
import { GetWalletInfo } from './types'

export function getWalletInfo(): GetWalletInfo {
  return {
    type: ActionNames.GET_WALLET_INFO
  }
}
