// tslint:disable:max-line-length

import ElectraJs, { WalletHard } from 'electra-js'
import * as path from 'path'

import { bindEventToAsyncCall, bindEventToProp, bindEventToSyncCall } from './helpers'
import { EventToCall, EventToProp } from './types'

export default class Communication {
  public electraJs: ElectraJs<WalletHard>

  public constructor() {
    this.electraJs = new ElectraJs({
      binariesPath: Boolean(process.env.ELECTRON_IS_LOCAL)
        ? path.resolve(__dirname, '../node_modules/electra-js/bin')
        : path.resolve(__dirname, '../../app.asar.unpacked/node_modules/electra-js/bin'),
      isHard: true,
    })

    this.bindEvents()
  }

  private bindEvents(): void {
    // Bind events to props
    [
      { event: 'electraJs:wallet:addresses', instance: this.electraJs.wallet, prop: 'addresses' },
      { event: 'electraJs:wallet:allAddresses', instance: this.electraJs.wallet, prop: 'allAddresses' },
      { event: 'electraJs:wallet:checkingAddresses', instance: this.electraJs.wallet, prop: 'checkingAddresses' },
      { event: 'electraJs:wallet:daemonState', instance: this.electraJs.wallet, prop: 'daemonState' },
      { event: 'electraJs:wallet:isNew', instance: this.electraJs.wallet, prop: 'isNew' },
      { event: 'electraJs:wallet:lockState', instance: this.electraJs.wallet, prop: 'lockState' },
      { event: 'electraJs:wallet:masterNodeAddress', instance: this.electraJs.wallet, prop: 'masterNodeAddress' },
      { event: 'electraJs:wallet:mnemonic', instance: this.electraJs.wallet, prop: 'mnemonic' },
      { event: 'electraJs:wallet:purseAddresses', instance: this.electraJs.wallet, prop: 'purseAddresses' },
      { event: 'electraJs:wallet:randomAddresses', instance: this.electraJs.wallet, prop: 'randomAddresses' },
      { event: 'electraJs:wallet:savingsAddresses', instance: this.electraJs.wallet, prop: 'savingsAddresses' },
      { event: 'electraJs:wallet:state', instance: this.electraJs.wallet, prop: 'state' },
    ]
      .forEach(({ event, instance, prop }: EventToProp) => bindEventToProp(event, instance, prop));

    // Bind events to async calls
    [
      { event: 'electraJs:wallet:createAddress', call: this.electraJs.wallet.createAddress.bind(this.electraJs.wallet) },
      { event: 'electraJs:wallet:export', call: this.electraJs.wallet.export.bind(this.electraJs.wallet) },
      { event: 'electraJs:wallet:generate', call: this.electraJs.wallet.generate.bind(this.electraJs.wallet) },
      { event: 'electraJs:wallet:getAddressBalance', call: this.electraJs.wallet.getAddressBalance.bind(this.electraJs.wallet)},
      { event: 'electraJs:wallet:getBalance', call: this.electraJs.wallet.getBalance.bind(this.electraJs.wallet)},
      { event: 'electraJs:wallet:getCategoryBalance', call: this.electraJs.wallet.getCategoryBalance.bind(this.electraJs.wallet)},
      { event: 'electraJs:wallet:getInfo', call: this.electraJs.wallet.getInfo.bind(this.electraJs.wallet)},
      { event: 'electraJs:wallet:getSavingsCumulatedRewards', call: this.electraJs.wallet.getSavingsCumulatedRewards.bind(this.electraJs.wallet)},
      { event: 'electraJs:wallet:getTransaction', call: this.electraJs.wallet.getTransaction.bind(this.electraJs.wallet)},
      { event: 'electraJs:wallet:getTransactions', call: this.electraJs.wallet.getTransactions.bind(this.electraJs.wallet)},
      { event: 'electraJs:wallet:import', call: this.electraJs.wallet.import.bind(this.electraJs.wallet)},
      { event: 'electraJs:wallet:importRandomAddress', call: this.electraJs.wallet.importRandomAddress.bind(this.electraJs.wallet)},
      { event: 'electraJs:wallet:lock', call: this.electraJs.wallet.lock.bind(this.electraJs.wallet) },
      { event: 'electraJs:wallet:send', call: this.electraJs.wallet.send.bind(this.electraJs.wallet)},
      { event: 'electraJs:wallet:start', call: this.electraJs.wallet.start.bind(this.electraJs.wallet) },
      { event: 'electraJs:wallet:startDaemon', call: this.electraJs.wallet.startDaemon.bind(this.electraJs.wallet) },
      { event: 'electraJs:wallet:stopDaemon', call: this.electraJs.wallet.stopDaemon.bind(this.electraJs.wallet) },
      { event: 'electraJs:wallet:unlock', call: this.electraJs.wallet.unlock.bind(this.electraJs.wallet) },
      { event: 'electraJs:webServices:getCurrentPriceInBTC', call: this.electraJs.webServices.getCurrentPriceIn.bind(this.electraJs.webServices) },
      { event: 'electraJs:webServices:getCurrentPriceInUSD', call: this.electraJs.webServices.getCurrentPriceIn.bind(this.electraJs.webServices) },
    ]
      .forEach(({ event, call }: EventToCall) => bindEventToAsyncCall(event, call));

    // Bind events to sync calls
    [
      { event: 'electraJs:wallet:getAddressCategory', call: this.electraJs.wallet.getAddressCategory.bind(this.electraJs.wallet)},
      { event: 'electraJs:wallet:reset', call: this.electraJs.wallet.reset.bind(this.electraJs.wallet)},
    ]
      .forEach(({ event, call }: EventToCall) => bindEventToSyncCall(event, call))
  }
}
