import { ActionList, ActionType, Dispatchers } from './types'

const dispatchers: Dispatchers = {
  openUnlockModal: (): ActionList['OPEN_UNLOCK_MODAL'] =>
    ({
      type: ActionType.OPEN_UNLOCK_MODAL,
    }),
}

export default dispatchers
