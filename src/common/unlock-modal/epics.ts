import { ActionsObservable, ofType } from 'redux-observable'
import { from, of } from 'rxjs'
import { catchError, delay, flatMap, map, mapTo, mergeMap } from 'rxjs/operators'

import ElectraJsMiddleware from '../../middlewares/ElectraJs'
import { ActionList, ActionType } from './types'

const AUTO_RELOCK_TO_STAKING_ONLY_DELAY = 10_000

export default {
  autoRelockToStakingOnly: (action$: ActionsObservable<{ type: 'AUTO_RELOCK_TO_STAKING_ONLY' }>) =>
    action$.pipe(
      ofType(ActionType.AUTO_RELOCK_TO_STAKING_ONLY),
      delay(AUTO_RELOCK_TO_STAKING_ONLY_DELAY),
      map(({ payload: passphrase }: ActionList['AUTO_RELOCK_TO_STAKING_ONLY']) =>
        ({
          payload: passphrase,
          type: ActionType.SET_LOCK_TO_STAKING_ONLY,
        }),
      ),
    ),

  setLockToStackingOnly: (action$: ActionsObservable<{ type: 'SET_LOCK_TO_STAKING_ONLY' }>) =>
    action$.pipe(
      ofType(ActionType.SET_LOCK_TO_STAKING_ONLY),
      mergeMap(({ payload: passphrase }: ActionList['SET_LOCK_TO_STAKING_ONLY']) =>
        from(ElectraJsMiddleware.wallet.lockState !== 'LOCKED'
            ? ElectraJsMiddleware.wallet.lock()
            : Promise.resolve(),
        ).pipe(
          map(() => passphrase),
          catchError((error: Error) => {
            console.error(error.message)

            return of<ActionList['SET_LOCK_TO_STAKING_ONLY_ERROR']>({
              payload: 'Something went wrong.',
              type: ActionType.SET_LOCK_TO_STAKING_ONLY_ERROR,
            })
          }),
        ),
      ),
      mergeMap((passphrase: string) =>
        from(ElectraJsMiddleware.wallet.unlock(passphrase, true)).pipe(
          mapTo({
            payload: passphrase,
            type: ActionType.SET_LOCK_TO_STAKING_ONLY_SUCCESS,
          }),
          catchError((error: Error) => {
            console.error(error.message)

            return of<ActionList['SET_LOCK_TO_STAKING_ONLY_ERROR']>({
              payload: 'Your passphrase seems to be incorrect.',
              type: ActionType.SET_LOCK_TO_STAKING_ONLY_ERROR,
            })
          }),
        ),
      ),
    ),

  setLockToUnlocked: (action$: ActionsObservable<{ type: 'SET_LOCK_TO_UNLOCKED' }>) =>
    action$.pipe(
      ofType(ActionType.SET_LOCK_TO_UNLOCKED),
      mergeMap(({ payload: passphrase }: ActionList['SET_LOCK_TO_UNLOCKED']) =>
        from(ElectraJsMiddleware.wallet.lockState !== 'LOCKED'
            ? ElectraJsMiddleware.wallet.lock()
            : Promise.resolve(),
        ).pipe(
          map(() => passphrase),
          catchError((error: Error) => {
            console.error(error.message)

            return of<ActionList['SET_LOCK_TO_UNLOCKED_ERROR']>({
              payload: 'Something went wrong.',
              type: ActionType.SET_LOCK_TO_UNLOCKED_ERROR,
            })
          }),
        ),
      ),
      mergeMap((passphrase: string) =>
        from(ElectraJsMiddleware.wallet.unlock(passphrase, false)).pipe(
          flatMap(() => [
            { type: ActionType.SET_LOCK_TO_UNLOCKED_SUCCESS },
            {
              payload: passphrase,
              type: ActionType.AUTO_RELOCK_TO_STAKING_ONLY,
            },
          ]),
          catchError((error: Error) => {
            console.error(error.message)

            return of<ActionList['SET_LOCK_TO_UNLOCKED_ERROR']>({
              payload: 'Your passphrase seems to be incorrect.',
              type: ActionType.SET_LOCK_TO_UNLOCKED_ERROR,
            })
          }),
        ),
      ),
    ),
}
