import { WalletAddress } from 'electra-js'
import { remote } from 'electron'
import * as storage from 'electron-json-storage'
import * as React from 'react'

import { USER_SETTINGS_DEFAULT } from '../../constants'
import ElectraJsMiddleware from '../../middlewares/ElectraJs'
import { UserSettings } from '../../types'
import { OwnState } from './types'

const styles = require('./styles.css')

export default class Settings extends React.Component<{}, OwnState> {
  private $autoTeamDonationFromRewardsRatio: HTMLInputElement
  private $electraUniverseTwitterUsername: HTMLInputElement
  private userSettings: UserSettings

  public constructor(props: {}) {
    super(props)

    this.state = {
      containerKeyIndex: 0,
      isLoading: true,
      settings: USER_SETTINGS_DEFAULT.settings,
    }
  }

  public componentDidMount(): void {
    this.loadUserSettings()
  }

  private loadUserSettings(): void {
    storage.get('userSettings', (err: Error, userSettings: UserSettings) => {
      if (err) throw err

      this.userSettings = userSettings
      this.setState({
        containerKeyIndex: this.state.containerKeyIndex + 1,
        isLoading: false,
        settings: userSettings.settings,
      })
    })
  }

  private updateSetting(name: keyof UserSettings['settings'], value?: any): void {
    if (this.state.isLoading) return

    this.setState({ isLoading: true })
    const settings: UserSettings['settings'] = this.state.settings
    settings[name] = value === undefined ? !this.state.settings[name] : value
    storage.set('userSettings', { ...this.userSettings, ...{ settings } }, (err: Error) => {
      if (err) throw err

      this.loadUserSettings()
    })
  }

  private async runSoftReset(): Promise<void> {
    if (this.state.isLoading) return

    this.setState({ isLoading: true })
    await ElectraJsMiddleware.wallet.reset()
    window.location.reload()
  }

  private async runHardReset(): Promise<void> {
    if (this.state.isLoading) return

    this.setState({ isLoading: true })
    await ElectraJsMiddleware.wallet.stopDaemon()
    storage.clear(async (err: Error) => {
      if (err) throw err

      await ElectraJsMiddleware.wallet.startDaemon()
      window.location.reload()
    })
  }

  public render(): JSX.Element {
    return (
      <div className='c-view' key={String(this.state.containerKeyIndex)}>
        <div className='c-view__header'>
          <h2 className='first'>Settings</h2>
        </div>
        <div className='c-view__content'>
          <div className={styles.row}>
            <span className={styles.label}>Application ID</span>
            {!this.state.isLoading ? this.userSettings.appId : '...'}
          </div>
          <div className={styles.row}>
            <span className={styles.label}>Version</span>
            {remote.app.getVersion()}
          </div>
          <div className={styles.row}>
            <span className={styles.label}>Enable auto-updates:</span>
            <input
              className={styles.checkbox}
              defaultChecked={this.state.settings.autoUpdate}
              disabled={this.state.isLoading}
              onChange={() => this.updateSetting('autoUpdate')}
              type='checkbox'
            />
          </div>
        </div>
        <div className={styles.subtitle}>Recovery</div>
        <div className={styles.row}>
          <span className={styles.label}>Reset Electra Daemon local data:</span>
          <button
            children={this.state.isLoading ? '...' : 'SOFT RESET'}
            className={styles.button}
            disabled={this.state.isLoading}
            onClick={this.runSoftReset.bind(this)}
            type='button'
          />
        </div>
        <div className={styles.row}>
          <span className={styles.label}>Reset ALL the local data:</span>
          <button
            children={this.state.isLoading ? '...' : 'HARD RESET'}
            className={styles.button}
            disabled={this.state.isLoading}
            onClick={this.runHardReset.bind(this)}
            type='button'
          />
        </div>
        <div className={styles.subtitle}>Addresses</div>
        {ElectraJsMiddleware.wallet.addresses.map((address: WalletAddress) => (
          <div className={styles.row} key={address.hash}>
            <span className={styles.label}>
              {['Purse', 'Checking Account', 'Savings Account'][Number(address.category)]}
            </span>
            <span className='selectableText' style={{ fontFamily: 'monospace' }}>
              {`${address.hash} (${address.change})`}
            </span>
          </div>
        ))}
        {ElectraJsMiddleware.wallet.randomAddresses.map((address: WalletAddress) => (
          <div className={styles.row} key={address.hash}>
            <span className={styles.label}>Legacy Account</span>
            <span className='selectableText' style={{ fontFamily: 'monospace' }}>{address.hash}</span>
          </div>
        ))}
        <div className={styles.subtitle}>Experimental</div>
        <div className={styles.warning}>Do not use these settings unless you really know what you're doing !</div>
        <div className={styles.row}>
          <span className={styles.label}>Synchronize settings between apps:</span>
          <input
            className={styles.checkbox}
            defaultChecked={this.state.settings.synchronizeSettings}
            disabled={this.state.isLoading}
            onChange={() => this.updateSetting('synchronizeSettings')}
            type='checkbox'
          />
        </div>
        <div className={styles.row}>
          <span className={styles.label}>Enable auto-merge after rewards:</span>
          <input
            className={styles.checkbox}
            defaultChecked={this.state.settings.autoMergeSavingsTransactionsAfterRewards}
            disabled={this.state.isLoading}
            onChange={() => this.updateSetting('autoMergeSavingsTransactionsAfterRewards')}
            type='checkbox'
          />
        </div>
        <div className={styles.row}>
          <span className={styles.label}>Enable Team auto-donation from rewards:</span>
          <input
            className={styles.checkbox}
            defaultChecked={this.state.settings.autoTeamDonationFromRewards}
            disabled={this.state.isLoading}
            onChange={() => this.updateSetting('autoTeamDonationFromRewards')}
            type='checkbox'
          />
        </div>
        <div className={styles.row}>
          <span className={styles.label}>Team auto-donation ratio (in %):</span>
          <input
            className={styles.input}
            defaultValue={String(this.state.settings.autoTeamDonationFromRewardsRatio)}
            disabled={this.state.isLoading}
            type='number'
            ref={(node: HTMLInputElement) => this.$autoTeamDonationFromRewardsRatio = node}
          />
          <button
            children={this.state.isLoading ? '...' : 'Save'}
            className={styles.button}
            disabled={this.state.isLoading}
            onClick={() => this.updateSetting(
              'autoTeamDonationFromRewardsRatio',
              this.$autoTeamDonationFromRewardsRatio.value,
            )}
            type='button'
          />
        </div>
        <div className={styles.row}>
          <span className={styles.label}>Electra Universe Twitter username:</span>
          <input
            className={styles.input}
            defaultValue={this.state.settings.electraUniverseTwitterUsername}
            disabled={this.state.isLoading}
            type='text'
            ref={(node: HTMLInputElement) => this.$electraUniverseTwitterUsername = node}
          />
          <button
            children={this.state.isLoading ? '...' : 'Save'}
            className={styles.button}
            disabled={this.state.isLoading}
            onClick={() => this.updateSetting(
              'electraUniverseTwitterUsername',
              this.$electraUniverseTwitterUsername.value,
            )}
            type='button'
          />
        </div>
      </div>
    )
  }
}
