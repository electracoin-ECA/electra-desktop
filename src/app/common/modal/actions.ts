import to from 'await-to-js'
import * as ActionNames from './action-names'

import { WalletLockState } from 'electra-js'
import ElectraJsMiddleware from '../../../middlewares/ElectraJs'
import { SetOpened } from '../../payments/types'

const RELOCK_TIMER: number = 300000

export function setOpened(payload: boolean): SetOpened {
  return {
    payload,
    type: ActionNames.SET_OPENED
  }
}

export const setStakingOnly: any = async (passphrase: string, dispatch: any): Promise<any> => {
  const lockState: WalletLockState = ElectraJsMiddleware.wallet.lockState
  if (lockState !== 'LOCKED') {
    await ElectraJsMiddleware.wallet.lock()
  }

  const [err] = await to(ElectraJsMiddleware.wallet.unlock(passphrase, true))
  if (err) {
    dispatch({ type: ActionNames.SET_LOCKED_FAIL })

    return Promise.reject('Failed to unlock for staking only')
  }

  dispatch({ type: ActionNames.SET_LOCKED_SUCCESS })
}

export const setUnlocked: any = (passphrase: string): any => async (dispatch: any): Promise<any> => {
  const lockState: WalletLockState = ElectraJsMiddleware.wallet.lockState
  if (lockState !== 'LOCKED') {
    await ElectraJsMiddleware.wallet.lock()
  }

  const [err] = await to(ElectraJsMiddleware.wallet.unlock(passphrase, false))
  if (err) {
    dispatch({ type: ActionNames.SET_UNLOCKED_FAIL })

    return Promise.reject('Failed to unlock')
  }

  dispatch({ type: ActionNames.SET_UNLOCKED_SUCCESS })
  setTimeout(() => setStakingOnly(passphrase, dispatch), RELOCK_TIMER)
}
