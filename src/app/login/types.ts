import { ActionBaseWithPayload, ActionListGenerator } from '../../types'

/*
 * State
 */
export interface State {
  isUnlockModalOpened: boolean
  passphrase?: string
}
export interface OwnState {
  error?: string
  errorBis?: string
  firstInstallationScreen?:
    'ASK_USER_FOR_EXISTING_PASSPHRASE'
      | 'ASK_USER_FOR_NEW_MNEMONIC_REPEAT'
      | 'ASK_USER_FOR_NEW_PASSPHRASE'
      | 'ASK_USER_FOR_NEW_PASSPHRASE_REPEAT'
      | 'ASK_USER_FOR_EXISTING_MNEMONIC'
      | 'ASK_USER_FOR_START_ACTION'
      | 'ASK_USER_FOR_START_ACTION_2'
      | 'SHOW_USER_NEW_MNEMONIC'
  isFirstInstallation?: boolean
  isFullInstallation?: boolean
  loadingText: string | undefined
  mnemonic?: string
  mnemonicExtension?: string
  passphrase?: string
  passphraseStrength?: string
}

/**
 * Properties
 */
export interface OwnProps {
  onDone(): void
}

/*
 * Dispatchers
 */
export type Dispatchers = {
  openUnlockModal(): ActionList['OPEN_UNLOCK_MODAL']
}

/*
 * Actions
 */
export enum ActionType {
  CLOSE_UNLOCK_MODAL = 'CLOSE_UNLOCK_MODAL',
  OPEN_UNLOCK_MODAL = 'OPEN_UNLOCK_MODAL',
  START_LOGIN_WALLET = 'START_LOGIN_WALLET',
}

export type ActionList = ActionListGenerator<ActionType, {
  START_LOGIN_WALLET: ActionBaseWithPayload<ActionType.START_LOGIN_WALLET, string>
}>
