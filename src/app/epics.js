import * as _ from 'lodash'

const epics = _.reduce(
  [],
  (result, epic) => _.concat(result, _.values(epic)),
  []
);

export default epics
