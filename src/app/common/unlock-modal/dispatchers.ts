import { ActionList, ActionType, Dispatchers } from './types'

const dispatchers: Dispatchers = {
  closeUnlockModal: (): ActionList['CLOSE_UNLOCK_MODAL'] =>
    ({
      type: ActionType.CLOSE_UNLOCK_MODAL,
    }),

  setLockToUnlocked: (passphrase: string): ActionList['SET_LOCK_TO_UNLOCKED'] =>
    ({
      payload: passphrase,
      type: ActionType.SET_LOCK_TO_UNLOCKED,
    }),
}

export default dispatchers
