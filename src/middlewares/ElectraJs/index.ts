import ElectraJs from 'electra-js'
import { ipcRenderer } from 'electron'

import { bindEventToSyncCall } from './helpers'
import Wallet from './wallet'
import WebServices from './webServices'

export default abstract class ElectraJsMiddleware {
  public static get constants(): ElectraJs['constants'] {
    return ipcRenderer.sendSync('electraJs:constants')
  }

  public static wallet: Wallet = Wallet
  public static webServices: WebServices = WebServices

  public static getVersion(): string {
    return bindEventToSyncCall<string>('electraJs:getVersion', arguments)
  }
}
