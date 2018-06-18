import { ActionListGenerator, UserSettings } from '../types'

/*
 * State
 */
export interface OwnState {
  containerKeyIndex: number
  isLoading: boolean
  isResetting: boolean
  settings: UserSettings['settings']
}

/*
 * Dispatchers
 */
export type Dispatchers = {
  stopLoopCalls(): ActionList['STOP_LOOP_CALLS']
}

/*
 * Actions
 */
export enum ActionType {
  STOP_LOOP_CALLS = 'STOP_LOOP_CALLS',
}

export type ActionList = ActionListGenerator<ActionType, {}>
