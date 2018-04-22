import * as _ from 'lodash'
import { Epic } from 'redux-observable'

import { accountEpics } from './account'
import { ToastEpic } from './common/toast'
import { unlockModalEpics } from './common/unlock-modal'
import { headerEpics } from './header'
import { loginEpics } from './login'
import { paymentsEpics } from './payments'

const epics: Array<Epic<any, any, any, any>> = _.reduce(
  [accountEpics, headerEpics, loginEpics, paymentsEpics, ToastEpic, unlockModalEpics],
  (result: any, epic: any) => _.concat(result, _.values(epic)),
  [],
)

export default epics
