import * as ActionNames from './actionNames'
import { SetMessageAndBadge } from './types'

export function setMessageAndBadge(message: string, badge: string): SetMessageAndBadge {
  return {
    payload: { badge, message },
    type: ActionNames.SET_MESSAGE_AND_BADGE,
  }
}
