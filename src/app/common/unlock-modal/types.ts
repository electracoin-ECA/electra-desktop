import { ActionBaseWithPayload, ActionListGenerator } from '../../types'

/*
 * State
 */
export interface State {
  error?: string
  isUnlocking: boolean
}

/*
 * Dispatchers
 */
export type Dispatchers = {
  closeUnlockModal(): ActionList['CLOSE_UNLOCK_MODAL']
  setLockToUnlocked(password: string): ActionList['SET_LOCK_TO_UNLOCKED']
}

/*
 * Actions
 */
export enum ActionType {
  CLOSE_UNLOCK_MODAL = 'CLOSE_UNLOCK_MODAL',
  SET_LOCK_TO_STAKING_ONLY = 'SET_LOCK_TO_STAKING_ONLY',
  SET_LOCK_TO_STAKING_ONLY_ERROR = 'SET_LOCK_TO_STAKING_ONLY_ERROR',
  SET_LOCK_TO_STAKING_ONLY_SUCCESS = 'SET_LOCK_TO_STAKING_ONLY_SUCCESS',
  SET_LOCK_TO_UNLOCKED = 'SET_LOCK_TO_UNLOCKED',
  SET_LOCK_TO_UNLOCKED_ERROR = 'SET_LOCK_TO_UNLOCKED_ERROR',
  SET_LOCK_TO_UNLOCKED_SUCCESS = 'SET_LOCK_TO_UNLOCKED_SUCCESS',
}

export type ActionList = ActionListGenerator<ActionType, {
  SET_LOCK_TO_STAKING_ONLY: ActionBaseWithPayload<ActionType.SET_LOCK_TO_STAKING_ONLY, string>
  SET_LOCK_TO_UNLOCKED: ActionBaseWithPayload<ActionType.SET_LOCK_TO_UNLOCKED, string>
  SET_LOCK_TO_UNLOCKED_ERROR: ActionBaseWithPayload<ActionType.SET_LOCK_TO_UNLOCKED_ERROR, string>
}>
