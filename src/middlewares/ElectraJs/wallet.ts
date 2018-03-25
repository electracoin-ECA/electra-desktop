import {
  WalletAddress,
  WalletDaemonState,
  WalletLockState,
  WalletState,
} from 'electra-js'
import { ipcRenderer } from 'electron'

import { bindEventToAsyncCall } from './helpers'

export default class Wallet {
  public get addresses(): WalletAddress[] {
    return JSON.parse(ipcRenderer.sendSync('electraJs:wallet:addresses'))
  }

  public get allAddresses(): WalletAddress[] {
    return JSON.parse(ipcRenderer.sendSync('electraJs:wallet:allAddresses'))
  }

  public get daemonState(): WalletDaemonState {
    return JSON.parse(ipcRenderer.sendSync('electraJs:wallet:daemonState'))
  }

  public get isNew(): boolean {
    return JSON.parse(ipcRenderer.sendSync('electraJs:wallet:isNew'))
  }

  public get lockState(): WalletLockState {
    return JSON.parse(ipcRenderer.sendSync('electraJs:wallet:lockState'))
  }

  public get mnemonic(): string {
    return JSON.parse(ipcRenderer.sendSync('electraJs:wallet:mnemonic'))
  }

  public get randomAddresses(): WalletAddress[] {
    return JSON.parse(ipcRenderer.sendSync('electraJs:wallet:randomAddresses'))
  }

  public get state(): WalletState {
    return JSON.parse(ipcRenderer.sendSync('electraJs:wallet:state'))
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

  public async getBalance(): Promise<number> {
    return bindEventToAsyncCall<number>('electraJs:wallet:getBalance', arguments)
  }

  public async lock(passphrase: string): Promise<void> {
    return bindEventToAsyncCall<void>('electraJs:wallet:lock', arguments)
  }

  public async unlock(passphrase: string, forStakingOnly?: boolean): Promise<void> {
    return bindEventToAsyncCall<void>('electraJs:wallet:unlock', arguments)
  }
}
