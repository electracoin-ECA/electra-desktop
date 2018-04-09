import { CoinMarketCapCurrency } from 'electra-js'

import { bindEventToAsyncCall } from './helpers'

export default class WebServices {
  public async getBalanceFor(address: string): Promise<number> {
    return bindEventToAsyncCall<number>('electraJs:webServices:getBalanceFor', arguments)
  }

  public async getCurrentPriceInUSD(currency?: CoinMarketCapCurrency): Promise<number> {
    return bindEventToAsyncCall<number>('electraJs:webServices:getCurrentPriceInUSD', arguments)
  }
  public async getCurrentPriceInBTC(currency?: CoinMarketCapCurrency): Promise<number> {
    return bindEventToAsyncCall<number>('electraJs:webServices:getCurrentPriceInBTC', arguments)
  }
}
