export { headerReducer } from './header'
export { electraReducer } from './electra'
import { HeaderState } from './header/types'

export interface RootState {
  headerReducer: HeaderState
}
