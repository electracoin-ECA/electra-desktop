import * as _ from 'lodash'
import { ElectraEpic } from './electra'
import { HeaderEpics } from './header'
import { OverviewEpic } from './overview'
import { TransactionsEpic } from './transactions'

const epics: any = _.reduce(
  [HeaderEpics, ElectraEpic, OverviewEpic, TransactionsEpic],
  (result: any, epic: any) => _.concat(result, _.values(epic)),
  []
)

export default epics
