import * as _ from 'lodash'
import { HeaderEpics } from './header'
import { ElectraEpic } from './electra'
import { OverviewEpic } from './overview'

const epics = _.reduce(
  [HeaderEpics, ElectraEpic, OverviewEpic],
  (result, epic) => _.concat(result, _.values(epic)),
  []
)

export default epics
