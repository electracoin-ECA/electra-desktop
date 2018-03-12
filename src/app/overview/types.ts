export interface DispatchProps {
    getGlobalBalance(): GetGlobalBalance,
}

export interface OverviewState {
    globalBalance: number
}

/**
 * action types
 */
export type GET_GLOBAL_BALANCE = 'GET_GLOBAL_BALANCE'
export type GET_GLOBAL_BALANCE_SUCCESS = 'GET_GLOBAL_BALANCE_SUCCESS'
export type GET_GLOBAL_BALANCE_FAIL = 'GET_GLOBAL_BALANCE_FAIL'

export interface GetGlobalBalance {
    type: GET_GLOBAL_BALANCE
}

export interface GetGlobalBalanceSuccess {
    type: GET_GLOBAL_BALANCE_SUCCESS,
    by: string,
    globalBalance: number
}

export interface GetGlobalBalanceFail {
    type: GET_GLOBAL_BALANCE_FAIL
}

export type OverviewActions = GetGlobalBalance |
                            GetGlobalBalanceSuccess |
                            GetGlobalBalanceFail
