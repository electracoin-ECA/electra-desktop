// import to from 'await-to-js'
// import { WalletLockState } from 'electra-js'

// import ElectraJsMiddleware from '../../../middlewares/ElectraJs'
import { ActionList, ActionType, DispatchProps } from './types'

// const RELOCK_DELAY = 60_000

const dispatchers: DispatchProps = {
  setLockToUnlocked: (passphrase: string): ActionList['SET_LOCK_TO_UNLOCKED'] =>
    ({
      payload: passphrase,
      type: ActionType.SET_LOCK_TO_UNLOCKED,
    }),
}

export default dispatchers
