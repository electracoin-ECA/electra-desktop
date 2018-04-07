import { WalletAddress } from 'electra-js'
import { ActionsObservable } from 'redux-observable'
import { Observable } from 'rxjs/Observable'

import ElectraJsMiddleware from '../../middlewares/ElectraJs'
import { ActionList as UnlockModalActionsList, ActionType as UnlockModalActionType } from '../common/unlock-modal/types'
import { ActionList, ActionType } from './types'

export default {
  closeElectraDaemon: (action$: ActionsObservable<UnlockModalActionsList['SET_LOCK_TO_UNLOCKED_SUCCESS']>) =>
    action$.ofType(UnlockModalActionType.SET_LOCK_TO_UNLOCKED_SUCCESS)
      .map((): ActionList['TOGGLE_UNLOCK_MODAL'] => ({
        type: ActionType.TOGGLE_UNLOCK_MODAL,
      })),

  getAddresses: (action$: ActionsObservable<ActionList['GET_ADDRESSES']>) =>
    action$.ofType(ActionType.GET_ADDRESSES)
      .map(() => ElectraJsMiddleware.wallet.allAddresses)
      .flatMap((addresses: WalletAddress[]) =>
        Observable.of<ActionList['GET_ADDRESSES_SUCCESS']>({
          payload: addresses,
          type: ActionType.GET_ADDRESSES_SUCCESS,
        }),
      ),

  sendECA: (action$: ActionsObservable<ActionList['SEND_ECA']>) =>
    action$.ofType(ActionType.SEND_ECA)
      .mergeMap(({ payload: { amount, to } }: ActionList['SEND_ECA']) =>
        Observable.fromPromise(ElectraJsMiddleware.wallet.send(amount, to))
          .map(() => ({
            type: ActionType.SEND_ECA_SUCCESS,
          }))
          .catch((error: Error) => {
            console.error(error.message)

            return Observable.of({
              type: ActionType.SEND_ECA_FAIL,
            })
          }),
    ),

}
