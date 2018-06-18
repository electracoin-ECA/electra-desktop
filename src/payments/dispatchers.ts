import { WalletAddressCategory } from 'electra-js'

import { ActionList, ActionType, Dispatchers } from './types'

const dispatchers: Dispatchers = {
  submitTransaction: (
    amount: number,
    fromCategory: WalletAddressCategory,
    toAddress: string,
  ): ActionList['SUBMIT_TRANSACTION'] =>
    ({
      payload: { amount, fromCategory, toAddress },
      type: ActionType.SUBMIT_TRANSACTION,
    }),

  toggleUnlockModal: (): ActionList['TOGGLE_UNLOCK_MODAL'] =>
    ({
      type: ActionType.TOGGLE_UNLOCK_MODAL,
    }),
}

export default dispatchers
