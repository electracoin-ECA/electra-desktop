import * as ActionNames from './actionNames'
import { ToastActions, ToastState } from './types'

const initialState: ToastState = {
  badge: null,
  message: null,
}

export default function toastReducer(state: ToastState = initialState, action: ToastActions): any {
  switch (action.type) {
    case ActionNames.SET_MESSAGE_AND_BADGE: {
      return {
        ...state,
        badge: action.payload.badge,
        message: action.payload.message,
      }
    }
    case ActionNames.HIDE_MESSAGE_AND_BADGE: {
      return { ...initialState }
    }
    default: return state
  }
}
