import { ActionList, ActionType, State } from './types'

const initialState: State = {
  addressError: undefined,
  amountError: undefined,
  isUnlockModalOpened: false,
}

export default function(state: State = initialState, action: ActionList[keyof ActionList]): State {
  switch (action.type) {
    case ActionType.SEND_TRANSACTION:
      return {
        ...state,
        addressError: initialState.addressError,
        amountError: initialState.amountError,
      }

    case ActionType.SUBMIT_TRANSACTION_ERROR:
      return {
        ...state,
        addressError: action.payload.addressError,
        amountError: action.payload.amountError,
      }

    case ActionType.TOGGLE_UNLOCK_MODAL:
      return {
        ...state,
        addressError: initialState.addressError,
        amountError: initialState.amountError,
        isUnlockModalOpened: !state.isUnlockModalOpened,
      }

    default:
      return state
  }
}
