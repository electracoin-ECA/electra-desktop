// tslint:disable:max-line-length
import to from 'await-to-js'
import ElectraJs from 'electra-js'

import { ipcMain } from 'electron'

interface EventToProp {
  event: string
  instance: any
  prop: string
}

interface EventToCall {
  event: string
  call(): any | Promise<any>
}

function bindEventToProp(eventName: string, instance: any, prop: string): void {
  ipcMain.on(eventName, async (event: any) => {
    console.info(`ipcMain: ${eventName}`)
    event.returnValue = JSON.stringify(instance[prop])
  })
}

function bindEventToAsyncCall(eventName: string, call: () => Promise<any>): void {
  ipcMain.on(eventName, async (event: any, argsString: string) => {
    console.info(`ipcMain: ${eventName}`)
    const [err, res] = await to(call.apply(null, JSON.parse(argsString)))
    if (err !== null) {
      console.info(`ipcMain: ${eventName}:error`, err)
      event.sender.send(`${eventName}:error`, err.message)

      return
    }

    console.info(`ipcMain: ${eventName}:success`, res)
    event.sender.send(`${eventName}:success`, JSON.stringify(res))
  })
}

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
      // { event: 'electraJs:wallet:getTransaction', call: this.electraJs.wallet.getTransaction.bind(this.electraJs.wallet)},
      { event: 'electraJs:wallet:send', call: this.electraJs.wallet.send.bind(this.electraJs.wallet)},
      { event: 'electraJs:wallet:getTransactions', call: this.electraJs.wallet.getTransactions.bind(this.electraJs.wallet)},
      { event: 'electraJs:webServices:getCurrentPriceInUSD', call: this.electraJs.webServices.getCurrentPriceIn.bind(this.electraJs.webServices) },
      { event: 'electraJs:webServices:getCurrentPriceInBTC', call: this.electraJs.webServices.getCurrentPriceIn.bind(this.electraJs.webServices) }
    ]
      .forEach(({ event, call }: EventToCall) => bindEventToAsyncCall(event, call))
  }
}
