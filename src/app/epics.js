import * as _ from 'lodash'

const epcis = _.reduce(
  [],
  (result, epic) => _.concat(result, _.values(epic)),
  []
);

export default epcis
