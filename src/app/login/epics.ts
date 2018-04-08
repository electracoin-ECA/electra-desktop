import { ActionsObservable } from 'redux-observable'

import { ActionList as UnlockModalActionsList, ActionType as UnlockModalActionType } from '../common/unlock-modal/types'
import { ActionType } from './types'

export default {
  closeUnlockModal: (action$: ActionsObservable<UnlockModalActionsList['SET_LOCK_TO_STAKING_ONLY_SUCCESS']>) =>
    action$.ofType(UnlockModalActionType.SET_LOCK_TO_STAKING_ONLY_SUCCESS)
      .mapTo({ type: ActionType.CLOSE_UNLOCK_MODAL }),
}
