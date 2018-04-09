import Payments from './container'
import dispatchers from './dispatchers'
import paymentsEpics from './epics'
import paymentsReducer from './reducer'

export { Payments, dispatchers as paymentsActions, paymentsEpics, paymentsReducer }
