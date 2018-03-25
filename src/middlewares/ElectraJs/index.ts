import ElectraJs from 'electra-js'
import { ipcRenderer } from 'electron'

import { bindEventToSyncCall } from './helpers'
import Wallet from './wallet'
import WebServices from './webServices'

export default class ElectraJsMiddleware {
  public static get constants(): ElectraJs['constants'] {
    return ipcRenderer.sendSync('electraJs:constants')
  }

  // tslint:disable-next-line:ban-types
  public static wallet: Wallet
  public static webServices: WebServices = new WebServices()

  public static getVersion(): string {
    return bindEventToSyncCall<string>('electraJs:getVersion', arguments)
  }
}
