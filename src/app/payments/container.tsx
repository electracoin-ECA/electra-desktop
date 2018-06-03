import { WalletAddress } from 'electra-js'
import * as React from 'react'
import { connect } from 'react-redux'

import ElectraJsMiddleware from '../../middlewares/ElectraJs'
import { setMessageAndBadge } from '../common/toast/actions'
import { COPIED_ADDRESS, /*PENDING, SENDING_IN_PROGRESS,*/ SUCCESS } from '../common/toast/toast-messages'
import UnlockModal from '../common/unlock-modal'
import { StoreState } from '../types'
import ReceiveCardView from './components/receive-card-view'
import SendCardView from './components/send-card-view'
import dispatchers from './dispatchers'
import { ComponentDispatchers, OwnState } from './types'

class Payments extends React.Component<StoreState & ComponentDispatchers, OwnState> {
  public constructor(props: StoreState & ComponentDispatchers) {
    super(props)

    this.state = {
      addresses: [],
    }
  }

  public componentDidMount(): void {
    this.setState({
      addresses: ElectraJsMiddleware.wallet.addresses
        // tslint:disable-next-line:no-magic-numbers
        .filter(({ category }: WalletAddress) => category !== 0 && category !== 3),
    })
  }

  public render(): JSX.Element {
    return (
      <div className='c-view'>
        {this.props.payments.isUnlockModalOpened && <UnlockModal isCancellable={true} isStakingOnly={false} />}
        <div className='c-view__header'>
          <h2 className='first'>Payments</h2>
        </div>
        <div className='o-grid o-grid--halves' style={{marginTop: '1em'}}>
          <SendCardView
            addressError={this.props.payments.addressError}
            amountError={this.props.payments.amountError}
            onPaymentSubmit={this.props.submitTransaction.bind(this)}
          />
          <ReceiveCardView
            addresses={this.state.addresses}
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
