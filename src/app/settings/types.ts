import { UserSettings } from '../../types'

/*
 * State
 */
export interface OwnState {
  isLoading: boolean
  settings: UserSettings['settings']
}
