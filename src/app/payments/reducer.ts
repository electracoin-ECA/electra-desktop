import { ActionList, ActionType, State } from './types'

const initialState: State = {
  addresses: [],
  isUnlockModalOpened: false,
  pendingTransaction: {
    amount: 0,
    to: '',
  },
}

export default function(state: State = initialState, action: ActionList[keyof ActionList]): State {
  switch (action.type) {
    case ActionType.SET_TO_ADDRESS:
      return {
        ...state,
        pendingTransaction: {
          ...state.pendingTransaction,
          to: action.payload,
        },
      }

    case ActionType.SET_AMOUNT:
      return {
        ...state,
        pendingTransaction: {
          ...state.pendingTransaction,
          amount: action.payload,
        },
      }

    case ActionType.GET_ADDRESSES_SUCCESS:
      return {
        ...state,
        addresses: action.payload,
      }

    case ActionType.CLEAR_SEND_CARD_FIELDS:
      return { ...initialState }

    case ActionType.TOGGLE_UNLOCK_MODAL:
      return {
        ...state,
        isUnlockModalOpened: !state.isUnlockModalOpened,
      }

    default:
      return state
  }
}
