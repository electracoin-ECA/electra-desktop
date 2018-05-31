import { WalletInfo } from 'electra-js'
import { ActionsObservable, ofType } from 'redux-observable'
import { from, of } from 'rxjs'
import { catchError, delay, flatMap, map, mergeMap } from 'rxjs/operators'

import ElectraJsMiddleware from '../../middlewares/ElectraJs'
import { ActionType } from './types'

const GET_WALLET_INFO_INTERVAL = 5_000

export default {
  getWalletInfo: (action$: ActionsObservable<{ type: 'GET_WALLET_INFO' }>) =>
    action$.pipe(
      ofType(ActionType.GET_WALLET_INFO),
      mergeMap(() =>
        from(ElectraJsMiddleware.wallet.getInfo()).pipe(
          flatMap((data: WalletInfo) => [
            {
              payload: data,
              type: ActionType.GET_WALLET_INFO_SUCCESS,
            },
            { type: ActionType.GET_WALLET_INFO_LOOP },
          ]),
          catchError((error: Error) => {
            console.error(error.message)

            return of({
              type: ActionType.GET_WALLET_INFO_ERROR,
            })
          }),
        ),
      ),
    ),

  getWalletInfoLoop: (action$: ActionsObservable<{ type: 'GET_WALLET_INFO_LOOP' }>) =>
    action$.pipe(
      ofType(ActionType.GET_WALLET_INFO_LOOP),
      delay(GET_WALLET_INFO_INTERVAL),
      map(() => ({ type: ActionType.GET_WALLET_INFO })),
    ),
}
