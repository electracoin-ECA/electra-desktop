import { ActionList, ActionType, State } from './types'

const initialState: State = {
  isUnlockModalOpened: false,
}

export default function(state: State = initialState, action: ActionList[keyof ActionList]): State {
  switch (action.type) {
    case ActionType.CLOSE_UNLOCK_MODAL:
      return {
        ...state,
        isUnlockModalOpened: false,
      }

    case ActionType.OPEN_UNLOCK_MODAL:
      return {
        ...state,
        isUnlockModalOpened: true,
      }

    default:
      return state
  }
}
