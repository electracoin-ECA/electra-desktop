import * as _ from 'lodash'

import { accountEpics } from './account'
import { ToastEpic } from './common/toast'
import { unlockModalEpics } from './common/unlock-modal'
import { headerEpics } from './header'
import { loginEpics } from './login'
import { paymentsEpics } from './payments'

const epics = _.reduce(
  [accountEpics, headerEpics, loginEpics, paymentsEpics, ToastEpic, unlockModalEpics],
  (result: any, epic: any) => _.concat(result, _.values(epic)),
  [],
)

export default epics
