import {
  WalletAddress,
  WalletAddressWithoutPK,
  WalletBalance,
  WalletDaemonState,
  WalletExchangeFormat,
  WalletInfo,
  WalletLockState,
  WalletStartDataHard,
  WalletState,
  WalletTransaction,
} from 'electra-js'
import { ipcRenderer } from 'electron'

import { bindEventToAsyncCall, bindEventToSyncCall } from './helpers'

export default class Wallet {
  /*
    GETTERS
  */

  public get addresses(): WalletAddressWithoutPK[] {
    return JSON.parse(ipcRenderer.sendSync('electraJs:wallet:addresses'))
  }

  public get allAddresses(): WalletAddressWithoutPK[] {
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

  public get masterNodeAddress(): WalletAddress {
    return JSON.parse(ipcRenderer.sendSync('electraJs:wallet:masterNodeAddress'))
  }

  public get mnemonic(): string {
    return JSON.parse(ipcRenderer.sendSync('electraJs:wallet:mnemonic'))
  }

  public get randomAddresses(): WalletAddressWithoutPK[] {
    return JSON.parse(ipcRenderer.sendSync('electraJs:wallet:randomAddresses'))
  }

  public get state(): WalletState {
    return JSON.parse(ipcRenderer.sendSync('electraJs:wallet:state'))
  }

  /*
    METHODS
  */

  public async startDaemon(): Promise<void> {
    return bindEventToAsyncCall<void>('electraJs:wallet:startDaemon', arguments)
  }

  public async stopDaemon(): Promise<void> {
    return bindEventToAsyncCall<void>('electraJs:wallet:stopDaemon', arguments)
  }

  public export(): string {
    return bindEventToSyncCall<string>('electraJs:wallet:export', arguments)
  }

  public async generate(mnemonic?: string, mnemonicExtension?: string, chainsCount?: number): Promise<void> {
    return bindEventToAsyncCall<void>('electraJs:wallet:generate', arguments)
  }

  public async getBalance(): Promise<WalletBalance> {
    return bindEventToAsyncCall<WalletBalance>('electraJs:wallet:getBalance', arguments)
  }

  public async getInfo(): Promise<WalletInfo> {
    return bindEventToAsyncCall<WalletInfo>('electraJs:wallet:getInfo', arguments)
  }

  public async getTransactions(count: number): Promise<WalletTransaction[]> {
    return bindEventToAsyncCall<WalletTransaction[]>('electraJs:wallet:getTransactions', arguments)
  }

  public async getTransaction(transactionHash: string): Promise<WalletTransaction> {
    return bindEventToAsyncCall<WalletTransaction>('electraJs:wallet:getTransaction', arguments)
  }

  public async import(wefData: WalletExchangeFormat, passphrase: string): Promise<void> {
    return bindEventToAsyncCall<void>('electraJs:wallet:import', arguments)
  }

  public async lock(passphrase?: string): Promise<void> {
    return bindEventToAsyncCall<void>('electraJs:wallet:lock', arguments)
  }

  public reset(): void {
    return bindEventToSyncCall<void>('electraJs:wallet:reset', arguments)
  }

  public async send(amount: number, to: string): Promise<void> {
    return bindEventToAsyncCall<void>('electraJs:wallet:send', arguments)
  }

  public start(data: WalletStartDataHard): void {
    return bindEventToSyncCall<void>('electraJs:wallet:start', arguments)
  }

  public async unlock(passphrase: string, forStakingOnly?: boolean): Promise<void> {
    return bindEventToAsyncCall<void>('electraJs:wallet:unlock', arguments)
  }
}
