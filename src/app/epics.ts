import * as _ from 'lodash'
import { Epic } from 'redux-observable'

import { ToastEpic } from './common/toast'
import { unlockModalEpics } from './common/unlock-modal'
import { headerEpics } from './header'
import { loginEpics } from './login'
import { OverviewEpic } from './overview'
import { paymentsEpics } from './payments'
import { TransactionsEpic } from './transactions'

const epics: Array<Epic<any, any, any, any>> = _.reduce(
  [headerEpics, loginEpics, OverviewEpic, paymentsEpics, TransactionsEpic, ToastEpic, unlockModalEpics],
  (result: any, epic: any) => _.concat(result, _.values(epic)),
  [],
)

export default epics
