import * as ActionNames from './action-names'
import { GetCurrentPriceBTC, GetCurrentPriceUSD, GetGlobalBalance  } from './types'

export function getGlobalBalance(): GetGlobalBalance {
    return {
        type: ActionNames.GET_GLOBAL_BALANCE
    }
}

export function getCurrentPriceInUSD(): GetCurrentPriceUSD {
    return {
        type: ActionNames.GET_CURRENT_PRICE_USD
    }
}

export function getCurrentPriceInBTC(): GetCurrentPriceBTC {
    return {
        type: ActionNames.GET_CURRENT_PRICE_BTC
    }
}
