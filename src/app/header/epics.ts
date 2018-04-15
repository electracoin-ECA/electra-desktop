import { WalletInfo } from 'electra-js'
import { ActionsObservable } from 'redux-observable'
import 'rxjs/add/observable/of'
import { Observable } from 'rxjs/Observable'

import ElectraJsMiddleware from '../../middlewares/ElectraJs'
import { ActionType } from './types'

const GET_WALLET_INFO_INTERVAL = 5_000

export default {
  getWalletInfo: (action$: ActionsObservable<{ type: 'GET_WALLET_INFO' }>) =>
    action$.ofType(ActionType.GET_WALLET_INFO)
      .mergeMap(() =>
        Observable
          .fromPromise(ElectraJsMiddleware.wallet.getInfo())
          .flatMap((data: WalletInfo) => [
            {
              payload: data,
              type: ActionType.GET_WALLET_INFO_SUCCESS,
            },
            { type: ActionType.GET_WALLET_INFO_LOOP },
          ])
          .catch((error: Error) => {
            console.error(error.message)

            return Observable.of({
            type: ActionType.GET_WALLET_INFO_ERROR,
          })}),
      ),

  getWalletInfoLoop: (action$: ActionsObservable<{ type: 'GET_WALLET_INFO_LOOP' }>) =>
    action$.ofType(ActionType.GET_WALLET_INFO_LOOP)
      .delay(GET_WALLET_INFO_INTERVAL)
      .map(() => ({ type: ActionType.GET_WALLET_INFO })),
}
