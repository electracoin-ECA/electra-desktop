import { remote } from 'electron'
import * as storage from 'electron-json-storage'
import * as React from 'react'

import { USER_SETTINGS_DEFAULT } from '../../constants'
import { UserSettings } from '../../types'
import { OwnState } from './types'

const styles = require('./styles.css')

export default class Settings extends React.Component<{}, OwnState> {
  private $autoTeamDonationFromRewardsRatio: HTMLInputElement
  private $electraUniverseTwitterUsername: HTMLInputElement
  private userSettings: UserSettings

  constructor(props: {}) {
    super(props)

    this.state = {
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
        isLoading: false,
        settings: userSettings.settings,
      })
    })
  }

  private updateSetting(name: keyof UserSettings['settings'], value?: any): void {
    console.warn(value)
    this.setState({ isLoading: true })
    const settings: UserSettings['settings'] = this.state.settings
    settings[name] = value === undefined ? !this.state.settings[name] : value
    console.warn(settings.electraUniverseTwitterUsername)
    storage.set('userSettings', { ...this.userSettings, ...{ settings } }, (err: Error) => {
      if (err) throw err

      this.loadUserSettings()
    })
  }

  public render(): JSX.Element {
    return (
      <div className='c-view'>
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
              checked={this.state.settings.autoUpdate}
              className={styles.checkbox}
              disabled={this.state.isLoading}
              onChange={() => this.updateSetting('autoUpdate')}
              type='checkbox'
            />
          </div>
        </div>
        <div className={styles.subtitle}>Experimental</div>
        <div className={styles.warning}>Do not use these settings unless you really know what you're doing !</div>
        <div className={styles.row}>
          <span className={styles.label}>Enable auto-merge after rewards:</span>
          <input
            checked={this.state.settings.autoMergeSavingsTransactionsAfterRewards}
            className={styles.checkbox}
            disabled={this.state.isLoading}
            onChange={() => this.updateSetting('autoMergeSavingsTransactionsAfterRewards')}
            type='checkbox'
          />
        </div>
        <div className={styles.row}>
          <span className={styles.label}>Enable Team auto-donation from rewards:</span>
          <input
            checked={this.state.settings.autoTeamDonationFromRewards}
            className={styles.checkbox}
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
          <span className={styles.label}>Enable Electra Universe:</span>
          <input
            checked={this.state.settings.electraUniverse}
            className={styles.checkbox}
            disabled={this.state.isLoading}
            onChange={() => this.updateSetting('electraUniverse')}
            type='checkbox'
          />
        </div>
        <div className={styles.row}>
          <span className={styles.label}>Electra Universe Twitter username:</span>
          {/* {this.state.settings.electraUniverseTwitterUsername} */}
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
