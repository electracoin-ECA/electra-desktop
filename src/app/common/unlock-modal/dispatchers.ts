import { ActionList, ActionType, Dispatchers } from './types'

const dispatchers: Dispatchers = {
  cancelUnlockModal: (): ActionList['CANCEL_UNLOCK_MODAL'] =>
    ({
      type: ActionType.CANCEL_UNLOCK_MODAL,
    }),

  setLockToStakingOnly: (passphrase: string): ActionList['SET_LOCK_TO_STAKING_ONLY'] =>
    ({
      payload: passphrase,
      type: ActionType.SET_LOCK_TO_STAKING_ONLY,
    }),

  setLockToUnlocked: (passphrase: string): ActionList['SET_LOCK_TO_UNLOCKED'] =>
    ({
      payload: passphrase,
      type: ActionType.SET_LOCK_TO_UNLOCKED,
    }),
}

export default dispatchers
