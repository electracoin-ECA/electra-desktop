export interface ToastState {
  badge: string | null,
  message: string | null
}

/**
 * Toast types interfaces
 */
export type SET_MESSAGE_AND_BADGE = 'SET_MESSAGE_AND_BADGE'
export type HIDE_MESSAGE_AND_BADGE = 'HIDE_MESSAGE_AND_BADGE'
export type PENDING = string
export type COPIED_ADDRESS = string
export type SENDING_IN_PROGRESS = string
export type SUCCESS = string
export type FAILED = string
export type SEND_SUCCESS = string
export type SEND_FAIL = string

export interface SetMessageAndBadge {
  payload: { badge: string, message: string },
  type: SET_MESSAGE_AND_BADGE
}

export interface HideMessageAndBadge {
  type: HIDE_MESSAGE_AND_BADGE
}

export type ToastActions = SetMessageAndBadge | HideMessageAndBadge
