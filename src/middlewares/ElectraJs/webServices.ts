import { CoinMarketCapCurrency } from 'electra-js'

import { bindEventToAsyncCall } from './helpers'

export default class WebServices {
  public static getBalanceFor(address: string): Promise<number> {
    return bindEventToAsyncCall<number>('electraJs:webServices:getBalanceFor', arguments)
  }

  public static getCurrentPriceIn(currency?: CoinMarketCapCurrency): Promise<number> {
    return bindEventToAsyncCall<number>('electraJs:webServices:getCurrentPriceIn', arguments)
  }
}
