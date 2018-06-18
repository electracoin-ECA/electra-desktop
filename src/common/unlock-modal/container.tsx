// import to from 'await-to-js'
import * as React from 'react'
import { connect } from 'react-redux'

import Loader from '../../shared/loader'
import Modal from '../../shared/modal'
import { StoreState } from '../../types'
import dispatchers from './dispatchers'
import { Dispatchers, Props } from './types'

const styles: any = require('./styles.css')

class UnlockModal extends React.PureComponent<StoreState & Dispatchers & Props> {
  private $password: HTMLInputElement

  public render(): JSX.Element {
    return (
      <div>
        {!this.props.unlockModal.isUnlocking && (
          <Modal
            confirmButtonText={'UNLOCK'}
            isCancellable={this.props.isCancellable}
            isForm={true}
            title={'Passphrase Verification'}
            text={'Please enter your passphrase to unlock your wallet:'}
            onClose={() => this.props.isCancellable ? this.props.cancelUnlockModal() : void 0}
            onConfirm={() => this.props.isStakingOnly
              ? this.props.setLockToStakingOnly(this.$password.value)
              : this.props.setLockToUnlocked(this.$password.value)
            }
          >
            <input
              autoFocus={true}
              className={Boolean(this.props.unlockModal.error) ? styles.inputError : styles.input}
              ref={(node: HTMLInputElement) => this.$password = node}
              type={'password'}
            />
            <p
              className={styles.error}
              children={Boolean(this.props.unlockModal.error) && `Error: ${this.props.unlockModal.error}`}
            />
          </Modal>
        )}

        {this.props.unlockModal.isUnlocking && (
          <Loader text={'Unlocking wallet...'} />
        )}
      </div>
    )
  }
}

export default connect<StoreState, Dispatchers>(
  (state: StoreState) => ({ ...state }),
  dispatchers,
)(UnlockModal)
