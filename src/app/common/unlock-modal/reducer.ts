import { ActionList, ActionType, State } from './types'

const initialState: State = {
  error: undefined,
  isUnlocking: false,
}

export default function(state: State = initialState, action: ActionList[keyof ActionList]): State {
  switch (action.type) {
    case ActionType.CANCEL_UNLOCK_MODAL:
      return { ...initialState }

    case ActionType.SET_LOCK_TO_STAKING_ONLY:
    case ActionType.SET_LOCK_TO_UNLOCKED:
      return {
        ...state,
        isUnlocking: true,
      }

    case ActionType.SET_LOCK_TO_STAKING_ONLY_ERROR:
    case ActionType.SET_LOCK_TO_UNLOCKED_ERROR:
      return {
        ...state,
        error: action.payload,
        isUnlocking: false,
      }

    case ActionType.SET_LOCK_TO_STAKING_ONLY_SUCCESS:
    case ActionType.SET_LOCK_TO_UNLOCKED_SUCCESS:
      return {
        ...state,
        isUnlocking: false,
      }

    default:
      return state
  }
}
