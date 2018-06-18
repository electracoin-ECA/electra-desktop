import UnlockModal from './container'
import dispatchers from './dispatchers'
import unlockModalEpics from './epics'
import unlockModalReducer from './reducer'

export default UnlockModal
export { dispatchers as unlockModalActions, unlockModalEpics, unlockModalReducer }
