import { ActionList, ActionType, State } from './types'

const initialState: State = {
  error: undefined,
  isUnlocking: false,
}

export default function(state: State = initialState, action: ActionList[keyof ActionList]): State {
  switch (action.type) {
    case ActionType.CLOSE_UNLOCK_MODAL:
      return {
        ...state,
        error: undefined,
        isUnlocking: false,
      }

    case ActionType.SET_LOCK_TO_UNLOCKED:
      return {
        ...state,
        isUnlocking: true,
      }

    case ActionType.SET_LOCK_TO_UNLOCKED_ERROR:
      return {
        ...state,
        error: action.payload,
        isUnlocking: false,
      }

    default:
      return state
  }
}
