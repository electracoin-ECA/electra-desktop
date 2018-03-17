import * as PaymentsNames from './action-names'
import * as PaymentsActions from './actions'
import Payments from './container'
import * as PaymentsEpic from './epics'
import paymentsReducer from './reducer'

export { Payments, PaymentsNames, PaymentsActions, paymentsReducer, PaymentsEpic }
