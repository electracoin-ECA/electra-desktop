import { ActionList, ActionType, State } from './types'

const initialState: State = {
  isUnlockModalOpened: false,
  passphrase: undefined,
}

export default function(state: State = initialState, action: ActionList[keyof ActionList]): State {
  switch (action.type) {
    case ActionType.OPEN_UNLOCK_MODAL:
      return {
        ...state,
        isUnlockModalOpened: true,
      }

    case ActionType.START_LOGIN_WALLET:
      return {
        ...state,
        isUnlockModalOpened: false,
        passphrase: action.payload,
      }

    default:
      return state
  }
}
