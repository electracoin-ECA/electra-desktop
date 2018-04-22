import { ActionsObservable } from 'redux-observable'
import { Observable } from 'rxjs/Observable'

import ElectraJsMiddleware from '../../../middlewares/ElectraJs'
import { ActionList, ActionType } from './types'

const AUTO_RELOCK_TO_STAKING_ONLY_DELAY = 10_000

export default {
  autoRelockToStakingOnly: (action$: ActionsObservable<{ type: 'AUTO_RELOCK_TO_STAKING_ONLY' }>) =>
    action$.ofType(ActionType.AUTO_RELOCK_TO_STAKING_ONLY)
      .delay(AUTO_RELOCK_TO_STAKING_ONLY_DELAY)
      .map(({ payload: passphrase }: ActionList['AUTO_RELOCK_TO_STAKING_ONLY']) =>
        ({
          payload: passphrase,
          type: ActionType.SET_LOCK_TO_STAKING_ONLY,
        })),

  setLockToStackingOnly: (action$: ActionsObservable<{ type: 'SET_LOCK_TO_STAKING_ONLY' }>) =>
    action$.ofType(ActionType.SET_LOCK_TO_STAKING_ONLY)
      .mergeMap(({ payload: passphrase }: ActionList['SET_LOCK_TO_STAKING_ONLY']) =>
        Observable
          .fromPromise(ElectraJsMiddleware.wallet.lockState !== 'LOCKED'
            ? ElectraJsMiddleware.wallet.lock()
            : Promise.resolve())
          .map(() => passphrase)
          .catch((error: Error) => {
            console.error(error.message)

            return Observable.of<ActionList['SET_LOCK_TO_STAKING_ONLY_ERROR']>({
              payload: 'Something went wrong.',
              type: ActionType.SET_LOCK_TO_STAKING_ONLY_ERROR,
            })
          }),
      )
      .mergeMap((passphrase: string) =>
        Observable.fromPromise(ElectraJsMiddleware.wallet.unlock(passphrase, true))
          .mapTo({
            payload: passphrase,
            type: ActionType.SET_LOCK_TO_STAKING_ONLY_SUCCESS,
          })
          .catch((error: Error) => {
            console.error(error.message)

            return Observable.of<ActionList['SET_LOCK_TO_STAKING_ONLY_ERROR']>({
              payload: 'Your passphrase seems to be incorrect.',
              type: ActionType.SET_LOCK_TO_STAKING_ONLY_ERROR,
            })
          }),
      ),

  setLockToUnlocked: (action$: ActionsObservable<{ type: 'SET_LOCK_TO_UNLOCKED' }>) =>
    action$.ofType(ActionType.SET_LOCK_TO_UNLOCKED)
      .mergeMap(({ payload: passphrase }: ActionList['SET_LOCK_TO_UNLOCKED']) =>
        Observable
          .fromPromise(ElectraJsMiddleware.wallet.lockState !== 'LOCKED'
            ? ElectraJsMiddleware.wallet.lock()
            : Promise.resolve())
          .map(() => passphrase)
          .catch((error: Error) => {
            console.error(error.message)

            return Observable.of<ActionList['SET_LOCK_TO_UNLOCKED_ERROR']>({
              payload: 'Something went wrong.',
              type: ActionType.SET_LOCK_TO_UNLOCKED_ERROR,
            })
          }),
      )
      .mergeMap((passphrase: string) =>
        Observable.fromPromise(ElectraJsMiddleware.wallet.unlock(passphrase, false))
          .flatMapTo([
            { type: ActionType.SET_LOCK_TO_UNLOCKED_SUCCESS },
            {
              payload: passphrase,
              type: ActionType.AUTO_RELOCK_TO_STAKING_ONLY,
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
}
