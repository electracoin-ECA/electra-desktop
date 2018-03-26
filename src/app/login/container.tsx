import to from 'await-to-js'
import * as storage from 'electron-json-storage'
import { isEmpty } from 'ramda'
import * as React from 'react'
import * as zxcvbn from 'zxcvbn'

import ElectraJsMiddleware from '../../middlewares/ElectraJs'
import Spinner from './spinner'

interface ComponentProps {
  onDone(): void
}

interface ComponentState {
  error?: string
  firstInstallationScreen?:
    'ASK_USER_FOR_EXISTING_PASSPHRASE'
    | 'ASK_USER_FOR_NEW_MNEMONIC_REPEAT'
    | 'ASK_USER_FOR_NEW_PASSPHRASE'
    | 'ASK_USER_FOR_NEW_PASSPHRASE_REPEAT'
    | 'ASK_USER_FOR_EXISTING_MNEMONIC'
    // | 'ASK_USER_FOR_MNEMONIC_REPEAT'
    | 'ASK_USER_FOR_START_ACTION'
    | 'SHOW_USER_NEW_MNEMONIC'
  isFirstInstallation?: boolean
  isFullInstallation?: boolean
  loadingText: string | undefined
  mnemonic?: string
  passphrase?: string
  passphraseStrength?: string
}

interface UserSettings {
  isFirstInstallation: boolean
}

const PASSPHRASE_LENGTH_MIN: number = 8

export default class Login extends React.PureComponent<ComponentProps, ComponentState> {
  private $addressesCount: HTMLInputElement
  private $mnemonic: HTMLInputElement
  private $passphrase: HTMLInputElement

  constructor(props: ComponentProps) {
    super(props)

    this.state = {
      loadingText: 'Bootstrapping...',
    }
  }

  public componentWillMount(): void {
    this.retrieveUserSettings()
  }

  private retrieveUserSettings(): void {
    this.setState({ loadingText: 'Loading user settings...' })
    storage.get('userSettings', (err: Error, userSettings: Partial<UserSettings>) => {
      if (err) throw err

      this.setState({
        // If there are no stored userSettings,
        // it's the first time the user install the new Desktop Wallet on this device.
        isFirstInstallation: isEmpty(userSettings),
      })

      this.startDaemon()
    })
  }

  private async startDaemon(): Promise<void> {
    this.setState({ loadingText: 'Starting Daemon...' })
    await ElectraJsMiddleware.startDaemon()
    this.setState({ loadingText: undefined })

    // Now that we have started the wallet daemon,
    // we need to start the first login process if this is a first installation.
    if (this.state.isFirstInstallation) this.startFirstInstallation()
  }

  private startFirstInstallation(): void {
    // If the wallet state is LOCKED, we first need to ask the user for its current password.
    // Indeed it can only be LOCKED if the legacy wallet had already been installed
    // and a passphrase had already been set on this device.
    if (ElectraJsMiddleware.lockState === 'LOCKED') {
      this.setState({
        firstInstallationScreen: 'ASK_USER_FOR_EXISTING_PASSPHRASE',
        isFullInstallation: false,
      })

      return
    }

    // If it's a brand new wallet because no ".Electra" directory was present before we started the Daemon,
    // we need to start the full first installation process in case the user wants to import or recover
    // a wallet that was previously generated on this device or another one.
    if (ElectraJsMiddleware.isNew) {
      this.setState({
        firstInstallationScreen: 'ASK_USER_FOR_START_ACTION',
        isFullInstallation: true,
      })

      return
    }

    // If it's UNLOCKED, and not a brand new wallet,
    // it's because the user has not set a passphrase via the legacy wallet on this device.
    // we need to start the full first installation process in case the user wants to import or recover
    // a wallet that was previously generated on this device or another one.
    this.setState({
      firstInstallationScreen: 'ASK_USER_FOR_NEW_PASSPHRASE',
      isFullInstallation: true,
    })
  }

  private async unlockWallet(): Promise<void> {
    this.setState({
      error: undefined,
      firstInstallationScreen: undefined,
      loadingText: 'Locking wallet...',
    })

    const [err] = await to(ElectraJsMiddleware.unlock(this.$passphrase.value, false))
    if (err !== null) {
      this.setState({
        error: 'Wrong passphrase !',
        firstInstallationScreen: 'ASK_USER_FOR_EXISTING_PASSPHRASE',
        loadingText: undefined,
      })

      return
    }

    this.generateNewHdWallet()
  }

  private async generateNewHdWallet(): Promise<void> {
    this.setState({ loadingText: 'Generating new mnemonic...' })
    await ElectraJsMiddleware.generate()
    this.setState({
      firstInstallationScreen: 'SHOW_USER_NEW_MNEMONIC',
      loadingText: undefined,
      mnemonic: ElectraJsMiddleware.mnemonic,
    })
  }

  private checkPassphraseStrength(): void {
    let passphraseStrength: string | undefined
    if (typeof this.$passphrase.value === 'string' && this.$passphrase.value.length !== 0) {
      const res: zxcvbn.ZXCVBNResult = zxcvbn(this.$passphrase.value)
      passphraseStrength = String(res.crack_times_display.offline_fast_hashing_1e10_per_second)
    }
    this.setState({ passphraseStrength })
  }

  private async checkNewPassphrase(): Promise<void> {
    this.setState({ error: undefined })

    if (this.$passphrase.value === undefined || this.$passphrase.value.length < PASSPHRASE_LENGTH_MIN) {
      this.setState({ error: `Your passphrase must contain at least ${PASSPHRASE_LENGTH_MIN} characters.` })

      return
    }

    this.setState({
      firstInstallationScreen: 'ASK_USER_FOR_NEW_PASSPHRASE_REPEAT',
      passphrase: this.$passphrase.value
    })
  }

  private async checkNewPassphraseRepeat(): Promise<void> {
    this.setState({ error: undefined })

    if (this.state.passphrase !== this.$passphrase.value) {
      this.setState({ error: 'The repeated passphrase does not match the first entered one.' })

      return
    }

    this.setState({
      firstInstallationScreen: undefined,
      loadingText: 'Locking wallet...',
    })
    await ElectraJsMiddleware.lock(this.state.passphrase)

    this.setState({ loadingText: 'Unlocking wallet...' })
    await ElectraJsMiddleware.unlock(this.state.passphrase, false)

    this.generateNewHdWallet()
  }

  private checkNewMnemonic(): void {
    this.setState({ error: undefined })

    if (this.$mnemonic.value !== this.state.mnemonic) {
      this.setState({ error: 'Wrong mnemonic !' })

      return
    }

    this.props.onDone()
  }

  private async recoverWalletFromMnemonic(): Promise<void> {
    await ElectraJsMiddleware.generate(this.$mnemonic.value, undefined, Number(this.$addressesCount.value))

    this.props.onDone()
  }

  public render(): JSX.Element {
    return (
      <div>
        {this.state.loadingText !== undefined && <Spinner text={this.state.loadingText} />}

        {/* Brand new wallet user choices */}
        {this.state.firstInstallationScreen === 'ASK_USER_FOR_START_ACTION' && (
          <div>
            <button
              children={'CREATE A NEW WALLET'}
              onClick={(): void => this.setState({ firstInstallationScreen: 'ASK_USER_FOR_NEW_PASSPHRASE' })}
            /><br />
            <button
              children={'IMPORT PRIVATE KEYS'}
              onClick={(): void => this.setState({})}
            /><br />
            <button
              children={'RECOVER A WALLET VIA MNEMONIC'}
              onClick={(): void => this.setState({ firstInstallationScreen: 'ASK_USER_FOR_EXISTING_MNEMONIC' })}
            /><br />
          </div>
        )}

        {/* First Setup for a brand new wallet (1/4) */}
        {this.state.firstInstallationScreen === 'ASK_USER_FOR_NEW_PASSPHRASE' && (
          <div>
            <h1>First Setup 1/4</h1>
            <p>Please enter a new strong passphrase:</p>
            <input
              ref={($node: HTMLInputElement): HTMLInputElement => this.$passphrase = $node}
              onInput={this.checkPassphraseStrength.bind(this)}
              type={'password'}
            /><br />
            {this.state.error !== undefined && <p>Error: {this.state.error}</p>}
            {this.state.passphraseStrength !== undefined && (
              <p>It will take {this.state.passphraseStrength} for a hacker to crack your password.</p>
            )}
            <button children={'NEXT'} onClick={this.checkNewPassphrase.bind(this)} />
          </div>
        )}

        {/* First Setup for a brand new wallet (2/4) */}
        {this.state.firstInstallationScreen === 'ASK_USER_FOR_NEW_PASSPHRASE_REPEAT' && (
          <div>
            <h1>First Setup 2/4</h1>
            <p>Please repeat your passphrase:</p>
            <input
              ref={($node: HTMLInputElement): HTMLInputElement => this.$passphrase = $node}
              type={'password'}
            /><br />
            {this.state.error !== undefined && <p>Error: {this.state.error}</p>}
            <button children={'NEXT'} onClick={this.checkNewPassphraseRepeat.bind(this)} />
          </div>
        )}

        {/* First Setup for an existing legacy wallet (1/3) */}
        {this.state.firstInstallationScreen === 'ASK_USER_FOR_EXISTING_PASSPHRASE' && (
          <div>
            <h1>First Setup 1/3</h1>
            <p>Please enter your current passphrase to unlock your existing wallet:</p>
            <input
              ref={($node: HTMLInputElement): HTMLInputElement => this.$passphrase = $node}
              type={'password'}
            /><br />
            {this.state.error !== undefined && <p>Error: {this.state.error}</p>}
            <button children={'UNLOCK'} onClick={this.unlockWallet.bind(this)} />
          </div>
        )}

        {/* First Setup for a brand new wallet (3/4) */}
        {/* First Setup for an existing legacy wallet (2/3) */}
        {this.state.firstInstallationScreen === 'SHOW_USER_NEW_MNEMONIC' && (
          <div>
            <h1>First Setup {this.state.isFullInstallation ? '3/4' : '2/3'}</h1>
            <p>Please write down your mnemonic somewhere:</p>
            <p><em>It will be used to recover your wallet if you loose your data.</em></p>
            <h2>{this.state.mnemonic}</h2>
            <button
              children={'I HAVE WRITTEN DOWN MY MNEMONIC'}
              onClick={(): void => this.setState({ firstInstallationScreen: 'ASK_USER_FOR_NEW_MNEMONIC_REPEAT' })}
            />
          </div>
        )}

        {/* First Setup for a brand new wallet (4/4) */}
        {/* First Setup for an existing legacy wallet (3/3) */}
        {this.state.firstInstallationScreen === 'ASK_USER_FOR_NEW_MNEMONIC_REPEAT' && (
          <div>
            <h1>First Setup {this.state.isFullInstallation ? '4/4' : '3/3'}</h1>
            <p>Please enter your new mnemonic to ensure you got it well:</p>
            <input
              ref={($node: HTMLInputElement): HTMLInputElement => this.$mnemonic = $node}
              type={'text'}
            /><br />
            {this.state.error !== undefined && <p>Error: {this.state.error}</p>}
            <button
              children={'SHOW ME AGAIN MY MNEMONIC'}
              onClick={(): void => this.setState({ firstInstallationScreen: 'SHOW_USER_NEW_MNEMONIC' })}
            />
            <button children={'CHECK'} onClick={this.checkNewMnemonic.bind(this)} />
          </div>
        )}

        {/* Recovering from a mnemonic (1/2) */}
        {this.state.firstInstallationScreen === 'ASK_USER_FOR_EXISTING_MNEMONIC' && (
          <div>
            <h1>Recovering Setup 1/2</h1>
            <p>Please enter your existing mnemonic:</p>
            <input
              ref={($node: HTMLInputElement): HTMLInputElement => this.$mnemonic = $node}
              type={'text'}
            /><br />
            <p>Please enter how many addresses you had:</p>
            <input
              ref={($node: HTMLInputElement): HTMLInputElement => this.$addressesCount = $node}
              type={'number'}
            /><br />
            <button children={'RECOVER'} onClick={this.recoverWalletFromMnemonic.bind(this)} />
          </div>
        )}
      </div>
    )
  }
}
