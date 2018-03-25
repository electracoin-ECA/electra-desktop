import to from 'await-to-js'
import * as storage from 'electron-json-storage'
import { isEmpty } from 'ramda'
import * as React from 'react'
import * as zxcvbn from 'zxcvbn'

import ElectraJsMiddleware from '../../middlewares/ElectraJs'
import LoadingSpinner from './loading-spinner'

const styles: any = require('./styles.css')

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
    await ElectraJsMiddleware.wallet.startDaemon()
    this.setState({ loadingText: undefined })

    // Now that we have started the wallet daemon,
    // we need to start the first login process if this is a first installation.
    if (this.state.isFirstInstallation) this.startFirstInstallation()
  }

  private startFirstInstallation(): void {
    // If the wallet state is LOCKED, we first need to ask the user for its current password.
    // Indeed it can only be LOCKED if the legacy wallet had already been installed
    // and a passphrase had already been set on this device.
    if (ElectraJsMiddleware.wallet.lockState === 'LOCKED') {
      this.setState({
        firstInstallationScreen: 'ASK_USER_FOR_EXISTING_PASSPHRASE',
        isFullInstallation: false,
      })

      return
    }

    // If it's a brand new wallet because no ".Electra" directory was present before we started the Daemon,
    // we need to start the full first installation process in case the user wants to import or recover
    // a wallet that was previously generated on this device or another one.
    if (ElectraJsMiddleware.wallet.isNew) {
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

  private async unlockWallet(event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault()
    this.setState({
      error: undefined,
      firstInstallationScreen: undefined,
      loadingText: 'Locking wallet...',
    })

    const [err] = await to(ElectraJsMiddleware.wallet.unlock(this.$passphrase.value, false))
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
    await ElectraJsMiddleware.wallet.generate()
    this.setState({
      firstInstallationScreen: 'SHOW_USER_NEW_MNEMONIC',
      loadingText: undefined,
      mnemonic: ElectraJsMiddleware.wallet.mnemonic,
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

  private async checkNewPassphrase(event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault()
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

  private async checkNewPassphraseRepeat(event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault()
    this.setState({ error: undefined })

    if (this.state.passphrase !== this.$passphrase.value) {
      this.setState({ error: 'The repeated passphrase does not match the first entered one.' })

      return
    }

    this.setState({
      firstInstallationScreen: undefined,
      loadingText: 'Locking wallet...',
    })
    await ElectraJsMiddleware.wallet.lock(this.state.passphrase)

    this.setState({ loadingText: 'Unlocking wallet...' })
    await ElectraJsMiddleware.wallet.unlock(this.state.passphrase, false)

    this.generateNewHdWallet()
  }

  private checkNewMnemonic(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault()
    this.setState({ error: undefined })

    if (this.$mnemonic.value !== this.state.mnemonic) {
      this.setState({ error: 'Wrong mnemonic !' })

      return
    }

    this.props.onDone()
  }

  private async recoverWalletFromMnemonic(event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault()
    await ElectraJsMiddleware.generate(this.$mnemonic.value, undefined, Number(this.$addressesCount.value))

    this.props.onDone()
  }

  // tslint:disable-next-line:cyclomatic-complexity
  public render(): JSX.Element {
    return (
      <div className={styles.container}>
        {this.state.loadingText !== undefined && (
          <div className={styles.innerContainer}>
            <LoadingSpinner text={this.state.loadingText} />
          </div>
        )}

        {/* Brand new wallet user choices */}
        {this.state.firstInstallationScreen === 'ASK_USER_FOR_START_ACTION' && (
          <div className={styles.innerContainer}>
            <button
              children={'CREATE A NEW WALLET'}
              className={styles.button}
              onClick={(): void => this.setState({ firstInstallationScreen: 'ASK_USER_FOR_NEW_PASSPHRASE' })}
            />
            <button
              children={'IMPORT PRIVATE KEYS'}
              className={styles.button}
              onClick={(): void => this.setState({})}
            />
            <button
              children={'RECOVER A WALLET VIA MNEMONIC'}
              className={styles.button}
              onClick={(): void => this.setState({ firstInstallationScreen: 'ASK_USER_FOR_EXISTING_MNEMONIC' })}
            />
          </div>
        )}

        {/* First Setup for a brand new wallet (1/4) */}
        {this.state.firstInstallationScreen === 'ASK_USER_FOR_NEW_PASSPHRASE' && (
          <div className={styles.innerContainerSplit}>
            <div className={styles.innerContainerSplitLeft}>
              <h1 className={styles.title}>First Setup 1/4</h1>
              <p className={styles.message}>
                {this.state.passphraseStrength !== undefined
                  ? [
                    <span key={'message-first-line'}>It will take {this.state.passphraseStrength}</span>,
                    <span key={'message-second-line'}>for a hacker to crack your password.</span>
                  ]
                  : `Are you ready for the test ?`
                }
              </p>
            </div>
            <form className={styles.innerContainerSplitRight} onSubmit={this.checkNewPassphrase.bind(this)}>
              <p>Please enter a new strong passphrase:</p>
              <input
                autoFocus={true}
                className={this.state.error !== undefined ? styles.inputError : styles.input}
                onInput={this.checkPassphraseStrength.bind(this)}
                ref={($node: HTMLInputElement): HTMLInputElement => this.$passphrase = $node}
                type={'password'}
              />
              <p className={styles.error} children={this.state.error !== undefined && `Error: ${this.state.error}`} />
              <button children={'NEXT'} className={styles.button} type={'submit'} />
            </form>
          </div>
        )}

        {/* First Setup for a brand new wallet (2/4) */}
        {this.state.firstInstallationScreen === 'ASK_USER_FOR_NEW_PASSPHRASE_REPEAT' && (
          <div className={styles.innerContainerSplit}>
            <div className={styles.innerContainerSplitLeft}>
              <h1 className={styles.title}>First Setup 2/4</h1>
              <p className={styles.message}>Life is full of rehearsals.</p>
            </div>
            <form className={styles.innerContainerSplitRight} onSubmit={this.checkNewPassphraseRepeat.bind(this)}>
              <p>Please repeat your passphrase:</p>
              <input
                autoFocus={true}
                className={this.state.error !== undefined ? styles.inputError : styles.input}
                ref={($node: HTMLInputElement): HTMLInputElement => this.$passphrase = $node}
                type={'password'}
              />
              <p className={styles.error} children={this.state.error !== undefined && `Error: ${this.state.error}`} />
              <button children={'NEXT'} className={styles.button} type={'submit'} />
            </form>
          </div>
        )}

        {/* First Setup for an existing legacy wallet (1/3) */}
        {this.state.firstInstallationScreen === 'ASK_USER_FOR_EXISTING_PASSPHRASE' && (
          <div className={styles.innerContainerSplit}>
            <div className={styles.innerContainerSplitLeft}>
              <h1 className={styles.title}>First Setup 1/3</h1>
              <p className={styles.message}>You never forget where you come from.</p>
            </div>
            <form className={styles.innerContainerSplitRight} onSubmit={this.unlockWallet.bind(this)}>
              <p>Please enter your current passphrase to unlock your existing wallet:</p>
              <input
                autoFocus={true}
                className={this.state.error !== undefined ? styles.inputError : styles.input}
                ref={($node: HTMLInputElement): HTMLInputElement => this.$passphrase = $node}
                type={'password'}
              />
              <p className={styles.error} children={this.state.error !== undefined && `Error: ${this.state.error}`} />
              <button children={'UNLOCK'} className={styles.button} type={'submit'} />
            </form>
          </div>
        )}

        {/* First Setup for a brand new wallet (3/4) */}
        {/* First Setup for an existing legacy wallet (2/3) */}
        {this.state.firstInstallationScreen === 'SHOW_USER_NEW_MNEMONIC' && (
          <div className={styles.innerContainerSplit}>
            <div className={styles.innerContainerSplitLeft}>
              <h1 className={styles.title}>First Setup {this.state.isFullInstallation ? '3/4' : '2/3'}</h1>
              <p className={styles.message}>
                <span>It will allow you to recover your wallet</span>
                <span>if you loose your data and/or your password.</span>
              </p>
            </div>
            <div className={styles.innerContainerSplitRight}>
              <p>Please write down your mnemonic somewhere:</p>
              <div className={styles.mnemonic}>
                {this.state.mnemonic !== undefined && (this.state.mnemonic.match(/([a-z]+\s){3}[a-z]+/g) as string[])
                  .map((words: string) => <span children={words} />)
                }
              </div>
              <button
                children={'I HAVE WRITTEN DOWN MY MNEMONIC'}
                className={styles.button}
                onClick={(): void => this.setState({ firstInstallationScreen: 'ASK_USER_FOR_NEW_MNEMONIC_REPEAT' })}
              />
            </div>
          </div>
        )}

        {/* First Setup for a brand new wallet (4/4) */}
        {/* First Setup for an existing legacy wallet (3/3) */}
        {this.state.firstInstallationScreen === 'ASK_USER_FOR_NEW_MNEMONIC_REPEAT' && (
          <div className={styles.innerContainerSplit}>
            <div className={styles.innerContainerSplitLeft}>
              <h1 className={styles.title}>First Setup {this.state.isFullInstallation ? '4/4' : '3/3'}</h1>
              <p className={styles.message}>Happiness is the longing for repetition.</p>
            </div>
            <form className={styles.innerContainerSplitRight} onSubmit={this.checkNewMnemonic.bind(this)}>
              <p>Please enter your mnemonic to ensure you got it well:</p>
              <input
                autoFocus={true}
                className={this.state.error !== undefined ? styles.inputError : styles.input}
                ref={($node: HTMLInputElement): HTMLInputElement => this.$mnemonic = $node}
                type={'text'}
              />
              <p className={styles.error} children={this.state.error !== undefined && `Error: ${this.state.error}`} />
              <div className={styles.buttonsRow}>
                <button
                  children={'SHOW ME MY MNEMONIC AGAIN'}
                  className={styles.button}
                  onClick={(): void => this.setState({ firstInstallationScreen: 'SHOW_USER_NEW_MNEMONIC' })}
                />
                <button children={'CHECK'} className={styles.button} type={'submit'} />
              </div>
            </form>
          </div>
        )}

        {/* Recovering from a mnemonic */}
        {this.state.firstInstallationScreen === 'ASK_USER_FOR_EXISTING_MNEMONIC' && (
          <div className={styles.innerContainerSplit}>
            <div className={styles.innerContainerSplitLeft}>
              <h1 className={styles.title}>Wallet Recovering</h1>
              <p className={styles.message}>I learned that one can always start again.</p>
            </div>
            <form className={styles.innerContainerSplitRight} onSubmit={this.recoverWalletFromMnemonic.bind(this)}>
              <p>Please enter your existing mnemonic:</p>
              <input
                autoFocus={true}
                className={this.state.error !== undefined ? styles.inputError : styles.input}
                ref={($node: HTMLInputElement): HTMLInputElement => this.$mnemonic = $node}
                type={'text'}
              />
              <p className={styles.error} children={this.state.error !== undefined && `Error: ${this.state.error}`} />
              <p>Please enter how many addresses you had:</p>
              <input
                autoFocus={true}
                className={this.state.error !== undefined ? styles.inputError : styles.input}
                ref={($node: HTMLInputElement): HTMLInputElement => this.$addressesCount = $node}
                type={'number'}
              />
              <button children={'RECOVER'} className={styles.button} type={'submit'} />
            </form>
          </div>
        )}
      </div>
    )
  }
}
