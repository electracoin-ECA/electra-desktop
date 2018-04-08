import { ActionList, ActionType, Dispatchers } from './types'

const dispatchers: Dispatchers = {
  submitTransaction: (amount: number, toAddress: string): ActionList['SUBMIT_TRANSACTION'] =>
    ({
      payload: { amount, toAddress },
      type: ActionType.SUBMIT_TRANSACTION,
    }),

  getAddresses: (): ActionList['GET_ADDRESSES'] =>
    ({
      type: ActionType.GET_ADDRESSES,
    }),

  toggleUnlockModal: (): ActionList['TOGGLE_UNLOCK_MODAL'] =>
    ({
      type: ActionType.TOGGLE_UNLOCK_MODAL,
    }),
}

export default dispatchers
