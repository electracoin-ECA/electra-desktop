import * as React from 'react'
import { connect } from 'react-redux'

import { setMessageAndBadge } from '../common/toast/actions'
import { COPIED_ADDRESS, /*PENDING, SENDING_IN_PROGRESS,*/ SUCCESS } from '../common/toast/toast-messages'
import { UnlockModal } from '../common/unlock-modal'
import { StoreState } from '../types'
import ReceiveCardView from './components/receive-card-view'
import SendCardView from './components/send-card-view'
import dispatchers from './dispatchers'
import { ComponentDispatchers } from './types'

class Payments extends React.Component<StoreState & ComponentDispatchers> {
  componentDidMount(): void {
    this.props.getAddresses()
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
            addressError={this.props.payments.addressError}
            amountError={this.props.payments.amountError}
            onPaymentSubmit={this.props.submitTransaction.bind(this)}
          />
          <ReceiveCardView
            addresses={this.props.payments.addresses}
            onCopy={() => this.props.setMessageAndBadge(COPIED_ADDRESS, SUCCESS)}
          />
        </div>
      </div>
    )
  }
}

export default connect<StoreState, ComponentDispatchers>(
  (state: StoreState) => ({ ...state }),
  { ...dispatchers, setMessageAndBadge },
)(Payments)
