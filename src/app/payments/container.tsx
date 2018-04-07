import * as React from 'react'
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'

import ElectraJsMiddleware from '../../middlewares/ElectraJs'
import { setMessageAndBadge } from '../common/toast/actions'
import { COPIED_ADDRESS, PENDING, SENDING_IN_PROGRESS, SUCCESS } from '../common/toast/toast-messages'
import { UnlockModal } from '../common/unlock-modal'
import { StoreState } from '../types'
import ReceiveCardView from './components/receive-card-view'
import SendCardView from './components/send-card-view'
import dispatchers from './dispatchers'
import { ComponentDispatchers } from './types'

const mapStateToProps: MapStateToProps<StoreState, {}, {}> = (state: StoreState) => ({ ...state })

const mapDispatchToProps: MapDispatchToProps<ComponentDispatchers, {}> = (dispatch: Dispatch<StoreState>) =>
  bindActionCreators({ ...dispatchers, setMessageAndBadge }, dispatch)

class Payments extends React.Component<StoreState & ComponentDispatchers> {
  componentDidMount(): void {
    this.props.getAddresses()
  }

  private sendPayment(): void {
    if (ElectraJsMiddleware.wallet.lockState !== 'UNLOCKED') {
      this.props.toggleUnlockModal()

      return
    }

    const { amount, to } = this.props.payments.pendingTransaction
    this.props.sendEca(amount, to)
    this.props.clearSendCardFields()
    this.props.setMessageAndBadge(SENDING_IN_PROGRESS, PENDING)
  }

  private onCopy(): void {
    this.props.setMessageAndBadge(COPIED_ADDRESS, SUCCESS)
  }

  public render(): JSX.Element {
    return (
      <div className='c-view'>
        {this.props.payments.isUnlockModalOpened && <UnlockModal />}
        <div className='c-view__header'>
          <h2>Payments</h2>
        </div>
        <div className='c-grid c-grid--halves py-4'>
          <SendCardView
            onPaymentSubmit={this.sendPayment.bind(this)}
          />
          <ReceiveCardView addresses={this.props.payments.addresses} onClick={this.onCopy} />
        </div>
      </div>
    )
  }
}

export default connect<StoreState, ComponentDispatchers>(mapStateToProps, mapDispatchToProps)(Payments)
