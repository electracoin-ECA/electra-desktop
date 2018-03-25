import { WalletLockState } from 'electra-js'
import { ipcRenderer } from 'electron'

import { bindEventToAsyncCall } from './helpers'

export default class Wallet {
  public get isNew(): boolean {
    return ipcRenderer.sendSync('electraJs:wallet:isNew')
  }

  public get lockState(): WalletLockState {
    return ipcRenderer.sendSync('electraJs:wallet:lockState')
  }

  public get mnemonic(): string {
    return ipcRenderer.sendSync('electraJs:wallet:mnemonic')
  }

  public async startDaemon(): Promise<void> {
    return bindEventToAsyncCall<void>('electraJs:wallet:startDaemon', arguments)
  }

  public async stopDaemon(): Promise<void> {
    return bindEventToAsyncCall<void>('electraJs:wallet:stopDaemon', arguments)
  }

  public async generate(mnemonic?: string, mnemonicExtension?: string, chainsCount?: number): Promise<void> {
    return bindEventToAsyncCall<void>('electraJs:wallet:generate', arguments)
  }

  public async lock(passphrase: string): Promise<void> {
    return bindEventToAsyncCall<void>('electraJs:wallet:lock', arguments)
  }

  public async unlock(passphrase: string, forStakingOnly?: boolean): Promise<void> {
    return bindEventToAsyncCall<void>('electraJs:wallet:unlock', arguments)
  }
}
