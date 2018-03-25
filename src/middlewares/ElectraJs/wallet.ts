import {
  WalletAddress,
  WalletDaemonState,
  WalletInfo,
  WalletLockState,
  WalletState,
  WalletTransaction
} from 'electra-js'
import { ipcRenderer } from 'electron'

import { bindEventToAsyncCall } from './helpers'
import WebServices from './webServices'

export default class Wallet extends WebServices {
  public static get addresses(): WalletAddress[] {
    return JSON.parse(ipcRenderer.sendSync('electraJs:wallet:addresses'))
  }

  public static get allAddresses(): WalletAddress[] {
    return JSON.parse(ipcRenderer.sendSync('electraJs:wallet:allAddresses'))
  }

  public static get daemonState(): WalletDaemonState {
    return JSON.parse(ipcRenderer.sendSync('electraJs:wallet:daemonState'))
  }

  public static get isNew(): boolean {
    return JSON.parse(ipcRenderer.sendSync('electraJs:wallet:isNew'))
  }

  public static get lockState(): WalletLockState {
    return JSON.parse(ipcRenderer.sendSync('electraJs:wallet:lockState'))
  }

  public static get mnemonic(): string {
    return JSON.parse(ipcRenderer.sendSync('electraJs:wallet:mnemonic'))
  }

  public static get randomAddresses(): WalletAddress[] {
    return JSON.parse(ipcRenderer.sendSync('electraJs:wallet:randomAddresses'))
  }

  public static get state(): WalletState {
    return JSON.parse(ipcRenderer.sendSync('electraJs:wallet:state'))
  }

  public static async startDaemon(): Promise<void> {
    return bindEventToAsyncCall<void>('electraJs:wallet:startDaemon', arguments)
  }

  public static async stopDaemon(): Promise<void> {
    return bindEventToAsyncCall<void>('electraJs:wallet:stopDaemon', arguments)
  }

  public static async generate(mnemonic?: string, mnemonicExtension?: string, chainsCount?: number): Promise<void> {
    return bindEventToAsyncCall<void>('electraJs:wallet:generate', arguments)
  }

  public static async getBalance(): Promise<number> {
    return bindEventToAsyncCall<number>('electraJs:wallet:getBalance', arguments)
  }

  public static async getInfo(): Promise<WalletInfo> {
    return bindEventToAsyncCall<WalletInfo>('electraJs:wallet:getInfo', arguments)
  }

  public static async getTransactions(count: number): Promise<WalletTransaction[]> {
    return bindEventToAsyncCall<WalletTransaction[]>('electraJs:wallet:getTransactions', arguments)
  }

  public static async lock(passphrase: string): Promise<void> {
    return bindEventToAsyncCall<void>('electraJs:wallet:lock', arguments)
  }

  public static async unlock(passphrase: string, forStakingOnly?: boolean): Promise<void> {
    return bindEventToAsyncCall<void>('electraJs:wallet:unlock', arguments)
  }

  public static async send(amount: number, to: string): Promise<void> {
    return bindEventToAsyncCall<void>('electraJs:wallet:send', arguments)
  }
}
