export interface DispatchProps {
    getCurrentPriceInBTC(): GetCurrentPriceBTC,
    getCurrentPriceInUSD(): GetCurrentPriceUSD
}

export interface OverviewState {
    currentPriceBTC: number,
    currentPriceUSD: number,
    globalBalance: number
}

/**
 * action types
 */
export type GET_GLOBAL_BALANCE = 'GET_GLOBAL_BALANCE'
export type GET_GLOBAL_BALANCE_SUCCESS = 'GET_GLOBAL_BALANCE_SUCCESS'
export type GET_GLOBAL_BALANCE_FAIL = 'GET_GLOBAL_BALANCE_FAIL'

export type GET_CURRENT_PRICE_USD = 'GET_CURRENT_PRICE_USD'
export type GET_CURRENT_PRICE_USD_SUCCESS = 'GET_CURRENT_PRICE_USD_SUCCESS'
export type GET_CURRENT_PRICE_USD_FAIL = 'GET_CURRENT_PRICE_USD_FAIL'

export type GET_CURRENT_PRICE_BTC = 'GET_CURRENT_PRICE_BTC'
export type GET_CURRENT_PRICE_BTC_SUCCESS = 'GET_CURRENT_PRICE_BTC_SUCCESS'
export type GET_CURRENT_PRICE_BTC_FAIL = 'GET_CURRENT_PRICE_BTC_FAIL'

/**
 * action interfaces
 */
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

export interface GetCurrentPriceUSD {
    type: GET_CURRENT_PRICE_USD
}

export interface GetCurrentPriceUSDSuccess {
    type: GET_CURRENT_PRICE_USD_SUCCESS,
    by: string,
    currentPriceUSD: number
}

export interface GetCurrentPriceUSDFail {
    type: GET_CURRENT_PRICE_USD_FAIL
}

export interface GetCurrentPriceBTC {
    type: GET_CURRENT_PRICE_BTC
}

export interface GetCurrentPriceBTCSuccess {
    type: GET_CURRENT_PRICE_BTC_SUCCESS,
    by: string,
    currentPriceBTC: number
}

export interface GetCurrentPriceBTCFail {
    type: GET_CURRENT_PRICE_BTC_FAIL
}

export type GlobalBalanceActions =  GetGlobalBalance |
                                    GetGlobalBalanceSuccess |
                                    GetGlobalBalanceFail

export type CurrentPriceActions =   GetCurrentPriceUSD |
                                    GetCurrentPriceUSDSuccess |
                                    GetCurrentPriceUSDFail |
                                    GetCurrentPriceBTC |
                                    GetCurrentPriceBTCSuccess |
                                    GetCurrentPriceBTCFail

export type OverviewActions =   GlobalBalanceActions |
                                CurrentPriceActions
