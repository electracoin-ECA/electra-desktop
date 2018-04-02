import * as ActionNames from './action-names'
import { ModalActions, ModalState } from './types'

const initialState: ModalState = {
  message: `You need to unlock your wallet in order to perform certain actions. Note, this unlock will last
  for 5 minutes only. After that, the wallet will return to Staking only`,
  opened: false,
  title: 'Please unlock your wallet'
}

export default function modalReducer(state: ModalState = initialState, action: ModalActions): any {
  switch (action.type) {
    case ActionNames.SET_OPENED: {
      return {
        ...state,
        opened: action.payload
      }
    }

    case ActionNames.SET_UNLOCKED_SUCCESS: {
      return { ...state }
    }

    case ActionNames.SET_UNLOCKED_FAIL: {
      return { ...state }
    }

    case ActionNames.SET_LOCKED_SUCCESS: {
      return { ...state }
    }

    case ActionNames.SET_LOCKED_FAIL: {
      return { ...state }
    }
    default: return state
  }
}
