import { CoinMarketCapCurrency } from 'electra-js'

import { bindEventToAsyncCall } from './helpers'

export default class WebServices {
  public getBalanceFor(address: string): Promise<number> {
    return bindEventToAsyncCall<number>('electraJs:getBalanceFor', arguments)
  }

  public getCurrentPriceIn(currency?: CoinMarketCapCurrency): Promise<number> {
    return bindEventToAsyncCall<number>('electraJs:getCurrentPriceIn', arguments)
  }
}
