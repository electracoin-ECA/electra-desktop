// tslint:disable:max-line-length

import ElectraJs from 'electra-js'

import { bindEventToAsyncCall, bindEventToProp, bindEventToSyncCall } from './helpers'
import { EventToCall, EventToProp } from './types'

export default class Communication {
  public electraJs: ElectraJs

  constructor() {
    this.electraJs = new ElectraJs({ isHard: true })

    this.bindEvents()
  }

  private bindEvents(): void {
    // Bind events to props
    [
      { event: 'electraJs:wallet:isNew', instance: this.electraJs.wallet, prop: 'isNew' },
      { event: 'electraJs:wallet:lockState', instance: this.electraJs.wallet, prop: 'lockState' },
      { event: 'electraJs:wallet:mnemonic', instance: this.electraJs.wallet, prop: 'mnemonic' },
      { event: 'electraJs:wallet:allAddresses', instance: this.electraJs.wallet, prop: 'allAddresses' },
    ]
      .forEach(({ event, instance, prop }: EventToProp) => bindEventToProp(event, instance, prop));

    // Bind events to async calls
    [
      { event: 'electraJs:wallet:startDaemon', call: this.electraJs.wallet.startDaemon.bind(this.electraJs.wallet) },
      { event: 'electraJs:wallet:stopDaemon', call: this.electraJs.wallet.stopDaemon.bind(this.electraJs.wallet) },
      { event: 'electraJs:wallet:generate', call: this.electraJs.wallet.generate.bind(this.electraJs.wallet) },
      { event: 'electraJs:wallet:lock', call: this.electraJs.wallet.lock.bind(this.electraJs.wallet) },
      { event: 'electraJs:wallet:unlock', call: this.electraJs.wallet.unlock.bind(this.electraJs.wallet) },
      { event: 'electraJs:wallet:getBalance', call: this.electraJs.wallet.getBalance.bind(this.electraJs.wallet)},
      { event: 'electraJs:wallet:getInfo', call: this.electraJs.wallet.getInfo.bind(this.electraJs.wallet)},
      { event: 'electraJs:wallet:getTransaction', call: this.electraJs.wallet.getTransaction.bind(this.electraJs.wallet)},
      { event: 'electraJs:wallet:send', call: this.electraJs.wallet.send.bind(this.electraJs.wallet)},
      { event: 'electraJs:wallet:getTransactions', call: this.electraJs.wallet.getTransactions.bind(this.electraJs.wallet)},
      { event: 'electraJs:webServices:getCurrentPriceInUSD', call: this.electraJs.webServices.getCurrentPriceIn.bind(this.electraJs.webServices) },
      { event: 'electraJs:webServices:getCurrentPriceInBTC', call: this.electraJs.webServices.getCurrentPriceIn.bind(this.electraJs.webServices) }
    ]
      .forEach(({ event, call }: EventToCall) => bindEventToAsyncCall(event, call));

    // Bind events to sync calls
    [
      { event: 'electraJs:wallet:export', call: this.electraJs.wallet.export.bind(this.electraJs.wallet) },
    ]
      .forEach(({ event, call }: EventToCall) => bindEventToSyncCall(event, call))
  }
}
