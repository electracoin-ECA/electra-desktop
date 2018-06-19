import { ActionsObservable, ofType } from 'redux-observable'
import { map } from 'rxjs/operators'

import { ActionList as UnlockModalActionsList, ActionType as UnlockModalActionType } from '../common/unlock-modal/types'
import { ActionType } from './types'

export default {
  closeUnlockModal: (action$: ActionsObservable<UnlockModalActionsList['SET_LOCK_TO_UNLOCKED_SUCCESS']>) =>
    action$.pipe(
      ofType(UnlockModalActionType.SET_LOCK_TO_UNLOCKED_SUCCESS),
      map(({ payload: passphrase }: UnlockModalActionsList['SET_LOCK_TO_UNLOCKED_SUCCESS']) => ({
        payload: passphrase,
        type: ActionType.START_LOGIN_WALLET,
      })),
    ),
}
