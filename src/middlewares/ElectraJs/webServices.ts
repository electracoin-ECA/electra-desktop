import { CoinMarketCapCurrency } from 'electra-js'

import { bindEventToAsyncCall } from './helpers'

export default abstract class WebServices {
  public static getBalanceFor(address: string): Promise<number> {
    return bindEventToAsyncCall<number>('electraJs:getBalanceFor', arguments)
  }

  public static getCurrentPriceIn(currency?: CoinMarketCapCurrency): Promise<number> {
    return bindEventToAsyncCall<number>('electraJs:getCurrentPriceIn', arguments)
  }
}
