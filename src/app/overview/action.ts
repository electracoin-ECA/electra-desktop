import * as ActionNames from './action-names'

export function getGlobalBalance() {
    return {
        type: ActionNames.GET_GLOBAL_BALANCE
    }
}
