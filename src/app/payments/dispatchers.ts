import { ActionList, ActionType, Dispatchers } from './types'

const dispatchers: Dispatchers = {
  sendEca: (amount: number, to: string): ActionList['SEND_ECA'] =>
    ({
      payload: { amount, to },
      type: ActionType.SEND_ECA,
    }),

  setAmount: (amount: number): ActionList['SET_AMOUNT'] =>
    ({
      payload: amount,
      type: ActionType.SET_AMOUNT,
    }),

  setToAddress: (address: string): ActionList['SET_TO_ADDRESS'] =>
    ({
      payload: address,
      type: ActionType.SET_TO_ADDRESS,
    }),

  clearSendCardFields: (): ActionList['CLEAR_SEND_CARD_FIELDS'] =>
    ({
      type: ActionType.CLEAR_SEND_CARD_FIELDS,
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
