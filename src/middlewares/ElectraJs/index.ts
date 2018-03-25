import ElectraJs from 'electra-js'
import { ipcRenderer } from 'electron'

import { bindEventToSyncCall } from './helpers'
import Wallet from './wallet'

export default class ElectraJsMiddleware extends Wallet {
  public static get constants(): ElectraJs['constants'] {
    return ipcRenderer.sendSync('electraJs:constants')
  }

  // tslint:disable-next-line:ban-types
  public static getVersion(): string {
    return bindEventToSyncCall<string>('electraJs:getVersion', arguments)
  }
}
