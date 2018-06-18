import { ActionBaseWithPayload, ActionListGenerator } from '../../types'

/*
 * State
 */
export interface State {
  error?: string
  isUnlocking: boolean
}

/**
 * Properties (own)
 */
export interface Props {
  isCancellable: boolean
  isStakingOnly: boolean
}

/*
 * Dispatchers
 */
export type Dispatchers = {
  cancelUnlockModal(): ActionList['CANCEL_UNLOCK_MODAL']
  setLockToStakingOnly(password: string): ActionList['SET_LOCK_TO_STAKING_ONLY']
  setLockToUnlocked(password: string): ActionList['SET_LOCK_TO_UNLOCKED']
}

/*
 * Actions
 */
export enum ActionType {
  AUTO_RELOCK_TO_STAKING_ONLY = 'AUTO_RELOCK_TO_STAKING_ONLY',
  CANCEL_UNLOCK_MODAL = 'CANCEL_UNLOCK_MODAL',
  SET_LOCK_TO_STAKING_ONLY = 'SET_LOCK_TO_STAKING_ONLY',
  SET_LOCK_TO_STAKING_ONLY_ERROR = 'SET_LOCK_TO_STAKING_ONLY_ERROR',
  SET_LOCK_TO_STAKING_ONLY_SUCCESS = 'SET_LOCK_TO_STAKING_ONLY_SUCCESS',
  SET_LOCK_TO_UNLOCKED = 'SET_LOCK_TO_UNLOCKED',
  SET_LOCK_TO_UNLOCKED_ERROR = 'SET_LOCK_TO_UNLOCKED_ERROR',
  SET_LOCK_TO_UNLOCKED_SUCCESS = 'SET_LOCK_TO_UNLOCKED_SUCCESS',
}

export type ActionList = ActionListGenerator<ActionType, {
  AUTO_RELOCK_TO_STAKING_ONLY: ActionBaseWithPayload<ActionType.AUTO_RELOCK_TO_STAKING_ONLY, string>
  SET_LOCK_TO_STAKING_ONLY: ActionBaseWithPayload<ActionType.SET_LOCK_TO_STAKING_ONLY, string>
  SET_LOCK_TO_STAKING_ONLY_ERROR: ActionBaseWithPayload<ActionType.SET_LOCK_TO_STAKING_ONLY_ERROR, string>
  SET_LOCK_TO_STAKING_ONLY_SUCCESS: ActionBaseWithPayload<ActionType.SET_LOCK_TO_STAKING_ONLY_SUCCESS, string>
  SET_LOCK_TO_UNLOCKED: ActionBaseWithPayload<ActionType.SET_LOCK_TO_UNLOCKED, string>
  SET_LOCK_TO_UNLOCKED_ERROR: ActionBaseWithPayload<ActionType.SET_LOCK_TO_UNLOCKED_ERROR, string>
}>
