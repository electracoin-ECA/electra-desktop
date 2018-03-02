import * as _ from 'lodash'
import { HeaderEpics } from './header'
import { ElectraEpic } from './electra'

const epics = _.reduce(
	[HeaderEpics, ElectraEpic],//[HeaderEpics, ElectraEpic],
	(result, epic) => _.concat(result, _.values(epic)),
	[]
);

export default epics
