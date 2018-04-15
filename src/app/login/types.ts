import { /*ActionBaseWithPayload,*/ ActionListGenerator } from '../types'

/*
 * State
 */
export interface State {
  isUnlockModalOpened: boolean
}
export interface OwnState {
  error?: string
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
  closeUnlockModal(): ActionList['CLOSE_UNLOCK_MODAL']
  openUnlockModal(): ActionList['OPEN_UNLOCK_MODAL']
}

/*
 * Actions
 */
export enum ActionType {
  CLOSE_UNLOCK_MODAL = 'CLOSE_UNLOCK_MODAL',
  OPEN_UNLOCK_MODAL = 'OPEN_UNLOCK_MODAL',
}

export type ActionList = ActionListGenerator<ActionType, {}>
