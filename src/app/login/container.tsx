import to from 'await-to-js'
import { Address, WalletAddress, /*WalletExchangeFormat,*/ WalletStartDataHard } from 'electra-js'
import * as storage from 'electron-json-storage'
import { isEmpty, pick } from 'ramda'
import * as React from 'react'
import { connect } from 'react-redux'
import * as zxcvbn from 'zxcvbn'

import { USER_SETTINGS_DEFAULT } from '../../constants'
import ElectraJsMiddleware from '../../middlewares/ElectraJs'
import { UserSettings } from '../../types'
import UnlockModal from '../common/unlock-modal'
import Loader from '../shared/loader'
import { StoreState } from '../types'
import dispatchers from './dispatchers'
import { Dispatchers, OwnProps, OwnState } from './types'

const styles: any = require('./styles.css')

const PASSPHRASE_LENGTH_MIN = 8

class Login extends React.Component<Dispatchers & StoreState & OwnProps, OwnState> {
  private $mnemonic: HTMLInputElement
  private $passphrase: HTMLInputElement

  constructor(props: Dispatchers & StoreState & OwnProps) {
    super(props)

    this.state = {
      loadingText: 'Bootstrapping...',
    }
  }

  public componentDidMount(): void {
    this.retrieveUserSettings()
  }

  public UNSAFE_componentWillReceiveProps(): void {
    if (ElectraJsMiddleware.wallet.state === 'READY' && ElectraJsMiddleware.wallet.lockState === 'STAKING') {
      this.props.onDone()
    }
  }

  private retrieveUserSettings(): void {
    this.setState({ loadingText: 'Loading user settings...' })
    storage.get('userSettings', async (err: Error, userSettings: Partial<UserSettings>) => {
      if (err) throw err

      // If the page was reloaded (i.e.: development environment), the #state won't be EMPTY.
      // And it needs to be EMPTY in order for #startDaemon() to work.
      if (ElectraJsMiddleware.wallet.state !== 'EMPTY') {
        ElectraJsMiddleware.wallet.reset()
      }

      await this.startDaemon()

      this.setState({
        // If there are no stored userSettings,
        // it's the first time the user install the new Desktop Wallet on this device.
        isFirstInstallation: isEmpty(userSettings) || ElectraJsMiddleware.wallet.lockState === 'UNLOCKED',
      })

      // Now that we have started the wallet daemon,
      // we need to start the first login process if this is a first installation.
      if (this.state.isFirstInstallation) {
        this.startFirstInstallation()

        return
      }

      const walletStartData: WalletStartDataHard =
        pick<UserSettings, 'addresses' | 'masterNodeAddress' | 'randomAddresses'>(
          ['addresses', 'masterNodeAddress', 'randomAddresses'],
          userSettings as UserSettings,
        )
      ElectraJsMiddleware.wallet.start(walletStartData)

      if (ElectraJsMiddleware.wallet.lockState === 'LOCKED') {
        this.props.openUnlockModal()

        return
      }

      this.props.onDone()
    })
  }

  private async saveUserSettings(): Promise<void> {
    this.setState({ loadingText: 'Locking wallet...' })
    await ElectraJsMiddleware.wallet.lock()

    this.setState({ loadingText: 'Exporting addresses...' })
    const masterNodeAddress: Address = ElectraJsMiddleware.wallet.masterNodeAddress
    const addresses: WalletAddress[] = ElectraJsMiddleware.wallet.addresses
    const randomAddresses: WalletAddress[] = ElectraJsMiddleware.wallet.randomAddresses

    // this.setState({ loadingText: 'Unlocking wallet...' })
    // await ElectraJsMiddleware.wallet.unlock(this.state.passphrase as string, false)

    // this.setState({ loadingText: 'Exporting WEF...' })
    // const wef: WalletExchangeFormat = JSON.parse(await ElectraJsMiddleware.wallet.export())

    this.setState({ loadingText: 'Saving user settings...' })
    const userSettings: UserSettings = {
      ...USER_SETTINGS_DEFAULT,
      ...{
        addresses,
        masterNodeAddress,
        randomAddresses,
        // wef,
      },
    }

    storage.set('userSettings', userSettings, async (err: Error) => {
      if (err) throw err

      this.setState({ loadingText: 'Unlocking wallet for staking only...' })
      await ElectraJsMiddleware.wallet.unlock(this.state.passphrase as string, true)

      this.props.onDone()
    })
  }

  private async startDaemon(): Promise<void> {
    this.setState({ loadingText: 'Starting Daemon...' })
    await ElectraJsMiddleware.wallet.startDaemon()
    this.setState({ loadingText: undefined })
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
    const passphrase: string = this.$passphrase.value
    this.setState({
      error: undefined,
      loadingText: 'Unlocking wallet...',
      passphrase: this.$passphrase.value,
    })

    const [err] = await to(ElectraJsMiddleware.wallet.unlock(passphrase, false))
    if (err !== null) {
      this.setState({
        error: 'Wrong passphrase !',
        firstInstallationScreen: 'ASK_USER_FOR_EXISTING_PASSPHRASE',
        loadingText: undefined,
        passphrase: undefined,
      })

      return
    }

    await this.generateNewHdWallet(passphrase)
  }

  private async generateNewHdWallet(passphrase: string): Promise<void> {
    this.setState({ loadingText: 'Generating new mnemonic and comprehensive accounts...' })
    await ElectraJsMiddleware.wallet.generate(passphrase)
    this.setState({
      firstInstallationScreen: 'SHOW_USER_NEW_MNEMONIC',
      loadingText: undefined,
      mnemonic: ElectraJsMiddleware.wallet.mnemonic,
    })
  }

  private checkPassphraseStrength(): void {
    let passphraseStrength: string | undefined
    if (this.$passphrase.value.length !== 0) {
      const res: zxcvbn.ZXCVBNResult = zxcvbn(this.$passphrase.value)
      passphraseStrength = String(res.crack_times_display.offline_fast_hashing_1e10_per_second)
    }
    this.setState({ passphraseStrength })
  }

  private async checkNewPassphrase(event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault()
    this.setState({ error: undefined })

    if (this.$passphrase.value.length < PASSPHRASE_LENGTH_MIN) {
      this.setState({ error: `Your passphrase must contain at least ${PASSPHRASE_LENGTH_MIN} characters.` })

      return
    }

    this.setState({
      firstInstallationScreen: 'ASK_USER_FOR_NEW_PASSPHRASE_REPEAT',
      passphrase: this.$passphrase.value,
    })
  }

  private async checkNewPassphraseRepeat(event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault()
    this.setState({ error: undefined })

    if (this.state.passphrase !== this.$passphrase.value) {
      this.setState({ error: 'The repeated passphrase does not match the first entered one.' })

      return
    }

    this.setState({ loadingText: 'Locking wallet...' })
    await ElectraJsMiddleware.wallet.lock(this.state.passphrase)

    this.setState({ loadingText: 'Unlocking wallet...' })
    await ElectraJsMiddleware.wallet.unlock(this.state.passphrase, false)

    await this.generateNewHdWallet(this.state.passphrase)
  }

  private async checkNewMnemonic(event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault()
    this.setState({ error: undefined })

    if (this.$mnemonic.value !== this.state.mnemonic) {
      this.setState({ error: 'Wrong mnemonic !' })

      return
    }

    await this.saveUserSettings()
  }

  private async recoverWalletFromMnemonic(event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault()
    // await ElectraJsMiddleware.wallet.generate(this.$mnemonic.value, undefined, Number(this.$addressesCount.value))

    // this.props.onDone()
  }

  // tslint:disable-next-line:cyclomatic-complexity
  public render(): JSX.Element {
    return (
      <div
        className={this.props.login.isUnlockModalOpened || this.state.loadingText !== undefined ?
          styles.containerTranparent
          : styles.container
        }
      >
        {this.props.login.isUnlockModalOpened && <UnlockModal isCancellable={false} isStakingOnly={true} />}

        {this.state.loadingText !== undefined && (
          <div className={styles.innerContainer}>
            <Loader text={this.state.loadingText} />
          </div>
        )}

        {/* Brand new wallet user choices */}
        {!Boolean(this.state.loadingText) && this.state.firstInstallationScreen === 'ASK_USER_FOR_START_ACTION' && (
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
            {/* <button
              children={'RECOVER A WALLET VIA MNEMONIC'}
              className={styles.button}
              onClick={(): void => this.setState({ firstInstallationScreen: 'ASK_USER_FOR_EXISTING_MNEMONIC' })}
            /> */}
          </div>
        )}

        {/* First Setup for a brand new wallet (1/4) */}
        {!Boolean(this.state.loadingText) && this.state.firstInstallationScreen === 'ASK_USER_FOR_NEW_PASSPHRASE' && (
          <div className={styles.innerContainerSplit}>
            <div className={styles.innerContainerSplitLeft}>
              <h1 className={styles.title}>First Setup 1/4</h1>
              <p className={styles.message}>
                {this.state.passphraseStrength !== undefined
                  ? [
                    <span key={'message-first-line'}>It will take {this.state.passphraseStrength}</span>,
                    <span key={'message-second-line'}>for a hacker to crack your password.</span>,
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
        {!Boolean(this.state.loadingText) &&
        this.state.firstInstallationScreen === 'ASK_USER_FOR_NEW_PASSPHRASE_REPEAT' && (
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
        {!Boolean(this.state.loadingText) &&
        this.state.firstInstallationScreen === 'ASK_USER_FOR_EXISTING_PASSPHRASE' && (
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
        {!Boolean(this.state.loadingText) &&
        this.state.firstInstallationScreen === 'SHOW_USER_NEW_MNEMONIC' && (
          <div className={styles.innerContainerSplit}>
            <div className={styles.innerContainerSplitLeft}>
              <h1 className={styles.title}>First Setup {this.state.isFullInstallation ? '3/4' : '2/3'}</h1>
              <p className={styles.message}>
                <span>It will allow you to recover your wallet</span>
                <span>if you lose your data and/or your password.</span>
              </p>
            </div>
            <div className={styles.innerContainerSplitRight}>
              <p>Please write down your mnemonic somewhere:</p>
              <div className={styles.mnemonic}>
                {this.state.mnemonic !== undefined && (this.state.mnemonic.match(/([a-z]+\s){3}[a-z]+/g) as string[])
                  .map((words: string, index: number) => <span key={`mnemonic-part-${index}`} children={words} />)
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
        {!Boolean(this.state.loadingText) &&
        this.state.firstInstallationScreen === 'ASK_USER_FOR_NEW_MNEMONIC_REPEAT' && (
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
        {!Boolean(this.state.loadingText) &&
        this.state.firstInstallationScreen === 'ASK_USER_FOR_EXISTING_MNEMONIC' && (
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
              <button children={'RECOVER'} className={styles.button} type={'submit'} />
            </form>
          </div>
        )}
      </div>
    )
  }
}

export default connect<StoreState, Dispatchers, OwnProps>(
  (state: StoreState) => ({ ...state }),
  dispatchers,
)(Login)
