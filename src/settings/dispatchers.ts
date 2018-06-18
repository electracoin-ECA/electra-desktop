import { ActionList, ActionType, Dispatchers } from './types'

const dispatchers: Dispatchers = {
  stopLoopCalls: (): ActionList['STOP_LOOP_CALLS'] =>
    ({
      type: ActionType.STOP_LOOP_CALLS,
    }),
}

export default dispatchers
