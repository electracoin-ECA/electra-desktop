import { CurrencyPrice } from 'electra-js'

import { bindEventToAsyncCall } from './helpers'

export default class WebServices {
  public async getBalanceFor(address: string): Promise<number> {
    return bindEventToAsyncCall<number>('electraJs:webServices:getBalanceFor', arguments)
  }

  public async getCurrentPriceIn(): Promise<CurrencyPrice> {
    return bindEventToAsyncCall<CurrencyPrice>('electraJs:webServices:getCurrentPriceIn', arguments)
  }
}
