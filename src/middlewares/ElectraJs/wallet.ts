// tslint:disable:max-line-length

import {
  Address,
  WalletAddress,
  WalletAddressCategory,
  WalletBalance,
  WalletDaemonState,
  WalletExchangeFormat,
  WalletHard,
  WalletInfo,
  WalletLockState,
  WalletStartDataHard,
  WalletState,
  WalletTransaction,
} from 'electra-js'
import { ipcRenderer } from 'electron'

import { bindEventToAsyncCall, bindEventToSyncCall } from './helpers'

export default class Wallet implements WalletHard {
  public get addresses(): WalletAddress[] { return JSON.parse(ipcRenderer.sendSync('electraJs:wallet:addresses')) }
  public get allAddresses(): WalletAddress[] { return JSON.parse(ipcRenderer.sendSync('electraJs:wallet:allAddresses')) }
  public get checkingAddresses(): WalletAddress[] { return JSON.parse(ipcRenderer.sendSync('electraJs:wallet:checkingAddresses')) }
  public get daemonState(): WalletDaemonState { return JSON.parse(ipcRenderer.sendSync('electraJs:wallet:daemonState')) }
  public get isNew(): boolean { return JSON.parse(ipcRenderer.sendSync('electraJs:wallet:isNew')) }
  public get lockState(): WalletLockState { return JSON.parse(ipcRenderer.sendSync('electraJs:wallet:lockState')) }
  public get masterNodeAddress(): Address { return JSON.parse(ipcRenderer.sendSync('electraJs:wallet:masterNodeAddress')) }
  public get mnemonic(): string { return JSON.parse(ipcRenderer.sendSync('electraJs:wallet:mnemonic')) }
  public get purseAddresses(): WalletAddress[] { return JSON.parse(ipcRenderer.sendSync('electraJs:wallet:purseAddresses')) }
  public get randomAddresses(): WalletAddress[] { return JSON.parse(ipcRenderer.sendSync('electraJs:wallet:randomAddresses')) }
  public get savingsAddresses(): WalletAddress[] { return JSON.parse(ipcRenderer.sendSync('electraJs:wallet:savingsAddresses')) }
  public get state(): WalletState { return JSON.parse(ipcRenderer.sendSync('electraJs:wallet:state')) }

  public async createAddress(passphrase: string, category: WalletAddressCategory): Promise<void> { return bindEventToAsyncCall<void>('electraJs:wallet:createAddress', arguments) }
  public async export(): Promise<string> { return bindEventToAsyncCall<string>('electraJs:wallet:export', arguments) }
  public async generate(passphrase: string, mnemonic?: string, mnemonicExtension?: string, purseAddressesCount?: number, checkingAddressesCount?: number, savingsAddressesCount?: number): Promise<string> { return bindEventToAsyncCall<string>('electraJs:wallet:generate', arguments) }
  public async getAddressBalance(addressHash: string): Promise<WalletBalance> { return bindEventToAsyncCall<WalletBalance>('electraJs:wallet:getAddressBalance', arguments) }
  public getAddressCategory(addressHash: string): WalletAddressCategory { return bindEventToSyncCall<WalletAddressCategory>('electraJs:wallet:getAddressCategory', arguments) }
  public async getBalance(): Promise<WalletBalance> { return bindEventToAsyncCall<WalletBalance>('electraJs:wallet:getBalance', arguments) }
  public async getCategoryBalance(category: WalletAddressCategory): Promise<WalletBalance> { return bindEventToAsyncCall<WalletBalance>('electraJs:wallet:getCategoryBalance', arguments) }
  public async getInfo(): Promise<WalletInfo> { return bindEventToAsyncCall<WalletInfo>('electraJs:wallet:getInfo', arguments) }
  public async getSavingsCumulatedRewards(): Promise<number> { return bindEventToAsyncCall<number>('electraJs:wallet:getSavingsCumulatedRewards', arguments) }
  public async getTransaction(transactionHash: string): Promise<WalletTransaction> { return bindEventToAsyncCall<WalletTransaction>('electraJs:wallet:getTransaction', arguments) }
  public async getTransactions(count?: number, inCategory?: WalletAddressCategory): Promise<WalletTransaction[]> { return bindEventToAsyncCall<WalletTransaction[]>('electraJs:wallet:getTransactions', arguments) }
  public async import(wefData: WalletExchangeFormat, passphrase: string): Promise<void> { return bindEventToAsyncCall<void>('electraJs:wallet:import', arguments) }
  public async importRandomAddress(privateKey: string, passphrase: string): Promise<void> { return bindEventToAsyncCall<void>('electraJs:wallet:importRandomAddress', arguments) }
  public async lock(passphrase?: string): Promise<void> { return bindEventToAsyncCall<void>('electraJs:wallet:lock', arguments) }
  public async reset(): Promise<void> { return bindEventToAsyncCall<void>('electraJs:wallet:reset', arguments) }
  public async send(amount: number, category: WalletAddressCategory, toAddressHash: string): Promise<void> { return bindEventToAsyncCall<void>('electraJs:wallet:send', arguments) }
  public async signMessage(message: string): Promise<string> { return bindEventToAsyncCall<string>('electraJs:wallet:signMessage', arguments) }
  public async start(data: WalletStartDataHard, passphrase: string): Promise<void> { return bindEventToAsyncCall<void>('electraJs:wallet:start', arguments) }
  public async startDaemon(): Promise<void> { return bindEventToAsyncCall<void>('electraJs:wallet:startDaemon', arguments) }
  public async stopDaemon(): Promise<void> { return bindEventToAsyncCall<void>('electraJs:wallet:stopDaemon', arguments) }
  public async unlock(passphrase: string, forStakingOnly: boolean): Promise<void> { return bindEventToAsyncCall<void>('electraJs:wallet:unlock', arguments) }
}
