import * as ActionNames from './action-names'
import { GetLastBlockTimestamp, GetWalletInfo } from './types'

export function getWalletInfo(): GetWalletInfo {
  return {
    type: ActionNames.GET_WALLET_INFO
  }
}

export function getLastBlockTimestamp(): GetLastBlockTimestamp {
  return {
    type: ActionNames.GET_LAST_BLOCK_TIMESTAMP
  }
}
