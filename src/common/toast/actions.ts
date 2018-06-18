import * as ActionNames from './action-names'
import { SetMessageAndBadge } from './types'

export function setMessageAndBadge(message: string, badge: string): SetMessageAndBadge {
  return {
    payload: { badge, message },
    type: ActionNames.SET_MESSAGE_AND_BADGE,
  }
}
