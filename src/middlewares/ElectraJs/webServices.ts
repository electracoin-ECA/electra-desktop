import { CoinMarketCapCurrency } from 'electra-js'

import { bindEventToAsyncCall } from './helpers'

export default class WebServices {
  public getBalanceFor(address: string): Promise<number> {
    return bindEventToAsyncCall<number>('electraJs:webServices:getBalanceFor', arguments)
  }

  public getCurrentPriceInUSD(currency?: CoinMarketCapCurrency): Promise<number> {
    return bindEventToAsyncCall<number>('electraJs:webServices:getCurrentPriceInUSD', arguments)
  }
  public getCurrentPriceInBTC(currency?: CoinMarketCapCurrency): Promise<number> {
    return bindEventToAsyncCall<number>('electraJs:webServices:getCurrentPriceInBTC', arguments)
  }
}
