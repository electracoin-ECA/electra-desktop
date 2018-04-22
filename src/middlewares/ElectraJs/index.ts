import ElectraJs, { WalletHard } from 'electra-js'
import { ipcRenderer } from 'electron'

import { bindEventToSyncCall } from './helpers'
import Wallet from './wallet'
import WebServices from './webServices'

export default class ElectraJsMiddleware extends Wallet {
  public static get constants(): ElectraJs<WalletHard>['constants'] {
    return ipcRenderer.sendSync('electraJs:constants')
  }
  public static wallet: Wallet = new Wallet()
  public static webServices: WebServices = new WebServices()

  public static getVersion(): string {
    return bindEventToSyncCall<string>('electraJs:getVersion', arguments)
  }
}
