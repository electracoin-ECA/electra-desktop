// import to from 'await-to-js'
import * as React from 'react'
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'

import Loader from '../../libraries/loader'
import Modal from '../../libraries/modal'
import { StoreState } from '../../types'
import dispatchers from './dispatchers'
import { DispatchProps } from './types'

const mapStateToProps: MapStateToProps<StoreState, {}, {}> = (state: StoreState): StoreState => ({ ...state })

const mapDispatchToProps: MapDispatchToProps<DispatchProps, {}> = (dispatch: Dispatch<StoreState>): DispatchProps =>
  bindActionCreators(dispatchers, dispatch)

class UnlockModal extends React.PureComponent<StoreState & DispatchProps> {
  private $password: HTMLInputElement

  public render(): JSX.Element {
    return (
      <div>
        {!this.props.unlockModal.isUnlocking && (
          <Modal
            confirmButtonText={'UNLOCK'}
            title={'Passphrase Verification'}
            text={'Please enter your passphrase to unlock your wallet:'}
            onClose={() => void 0}
            onConfirm={() => this.props.setLockToUnlocked(this.$password.value)}
          >
            {Boolean(this.props.unlockModal.error) && <div children={this.props.unlockModal.error} />}
            <input
              autoFocus={true}
              ref={(node: HTMLInputElement) => this.$password = node}
              type={'password'}
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

export default connect<StoreState, DispatchProps>(mapStateToProps, mapDispatchToProps)(UnlockModal)
