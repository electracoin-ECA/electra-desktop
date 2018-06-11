import { UserSettings } from '../../types'

/*
 * State
 */
export interface OwnState {
  containerKeyIndex: number
  isLoading: boolean
  settings: UserSettings['settings']
}
