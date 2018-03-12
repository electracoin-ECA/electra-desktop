import * as ActionNames from './action-names'
import { GetGlobalBalance } from './types'

export function getGlobalBalance(): GetGlobalBalance {
    return {
        type: ActionNames.GET_GLOBAL_BALANCE
    }
}
