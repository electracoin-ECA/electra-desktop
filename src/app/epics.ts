import * as _ from 'lodash'
import { ElectraEpic } from './electra'
import { HeaderEpics } from './header'

const epics: any = _.reduce(
  [HeaderEpics, ElectraEpic],
  (result: any, epic: any) => _.concat(result, _.values(epic)),
  []
)

export default epics
