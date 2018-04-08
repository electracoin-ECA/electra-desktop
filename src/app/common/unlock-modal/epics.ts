import { ActionsObservable } from 'redux-observable'
import { Observable } from 'rxjs/Observable'

import ElectraJsMiddleware from '../../../middlewares/ElectraJs'
import { ActionList, ActionType } from './types'

const RELOCK_FOR_STAKING_ONLY_DELAY = 60_000

export default {
  setLockToUnlocked: (action$: ActionsObservable<{ type: 'SET_LOCK_TO_UNLOCKED' }>) =>
    action$.ofType(ActionType.SET_LOCK_TO_UNLOCKED)
      .mergeMap(({ payload: passphrase }: ActionList['SET_LOCK_TO_UNLOCKED']) =>
        Observable.fromPromise(
          Promise.all([
            ElectraJsMiddleware.wallet.lockState !== 'UNLOCKED'
              ? ElectraJsMiddleware.wallet.lock()
              : Promise.resolve(),
            ElectraJsMiddleware.wallet.unlock(passphrase, false),
          ]),
        )
          .flatMapTo([
            { type: ActionType.SET_LOCK_TO_UNLOCKED_SUCCESS },
            {
              payload: passphrase,
              type: ActionType.SET_LOCK_TO_STAKING_ONLY,
            },
          ])
          .catch((error: Error) => {
            console.error(error.message)

            return Observable.of<ActionList['SET_LOCK_TO_UNLOCKED_ERROR']>({
              payload: 'Your passphrase seems to be incorrect.',
              type: ActionType.SET_LOCK_TO_UNLOCKED_ERROR,
            })
          }),
      ),

  setLockToStackingOnly: (action$: ActionsObservable<{ type: 'SET_LOCK_TO_STAKING_ONLY' }>) =>
    action$.ofType(ActionType.SET_LOCK_TO_STAKING_ONLY)
      .delay(RELOCK_FOR_STAKING_ONLY_DELAY)
      .mergeMap(({ payload: passphrase }: ActionList['SET_LOCK_TO_STAKING_ONLY']) =>
        Observable.fromPromise(ElectraJsMiddleware.wallet.lock())
          .map(() => passphrase)
          .catch((error: Error) => {
            console.error(error.message)

            return Observable.of<ActionList['SET_LOCK_TO_STAKING_ONLY_ERROR']>({
              type: ActionType.SET_LOCK_TO_STAKING_ONLY_ERROR,
            })
          }),
      )
      .mergeMap((passphrase: string) =>
        Observable.fromPromise(ElectraJsMiddleware.wallet.lock(passphrase))
          .map((): ActionList['SET_LOCK_TO_STAKING_ONLY_SUCCESS'] => ({
            type: ActionType.SET_LOCK_TO_STAKING_ONLY_SUCCESS,
          }))
          .catch((error: Error) => {
            console.error(error.message)

            return Observable.of<ActionList['SET_LOCK_TO_STAKING_ONLY_ERROR']>({
              type: ActionType.SET_LOCK_TO_STAKING_ONLY_ERROR,
            })
          }),
      ),
}
