import { ActionList, ActionType, Dispatchers } from './types'

const dispatchers: Dispatchers = {
  closeUnlockModal: (): ActionList['CLOSE_UNLOCK_MODAL'] =>
    ({
      type: ActionType.CLOSE_UNLOCK_MODAL,
    }),

  openUnlockModal: (): ActionList['OPEN_UNLOCK_MODAL'] =>
    ({
      type: ActionType.OPEN_UNLOCK_MODAL,
    }),
}

export default dispatchers
