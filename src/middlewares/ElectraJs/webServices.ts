import { CoinMarketCapCurrency } from 'electra-js'

import { bindEventToAsyncCall } from './helpers'

export default class WebServices {
  public getBalanceFor(address: string): Promise<number> {
    return bindEventToAsyncCall<number>('electraJs:webServices:getBalanceFor', arguments)
  }

  public getCurrentPriceIn(currency?: CoinMarketCapCurrency): Promise<number> {
    return bindEventToAsyncCall<number>('electraJs:webServices:getCurrentPriceIn', arguments)
  }
}
