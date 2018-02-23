import * as _ from 'lodash'
import { HeaderEpics } from './header'

const epics = _.reduce(
  [HeaderEpics],
  (result, epic) => _.concat(result, _.values(epic)),
  []
);

export default epics
