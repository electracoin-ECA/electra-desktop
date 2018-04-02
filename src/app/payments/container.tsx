import { WalletAddress, WalletLockState } from 'electra-js'
import * as React from 'react'
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import { setOpened } from '../common/modal/actions'
import { setMessageAndBadge } from '../common/toast/actions'
import { COPIED_ADDRESS, PENDING, SENDING_IN_PROGRESS, SUCCESS } from '../common/toast/toast-messages'
import { clearSendCardFields, getAddresses, sendEca, setAmount, setToAddress } from './actions'
import ReceiveCardView from './components/receive-card-view'
import SendCardView from './components/send-card-view'
import { DispatchProps, StateProps } from './types'

import ElectraJsMiddleware from '../../middlewares/ElectraJs'

import UnlockModal from '../common/modal/unlock-modal'

const mapStateToProps: MapStateToProps<StateProps, {}, {}> = (state: StateProps): StateProps => ({
  payments: state.payments
})

const mapDispatchToProps: MapDispatchToProps<DispatchProps, {}> =
(dispatch: Dispatch<StateProps>): DispatchProps =>
  bindActionCreators
  (
    {
      clearSendCardFields,
      getAddresses,
      sendEca,
      setAmount,
      setMessageAndBadge,
      setOpened,
      setToAddress
    },
    dispatch
  )

class Payments extends React.Component<StateProps & DispatchProps, DispatchProps> {
  componentDidMount(): void {
    this.props.getAddresses()
  }

  onClick = (): void => {
    const lockState: WalletLockState = ElectraJsMiddleware.wallet.lockState
    if (lockState !== 'UNLOCKED') {
      this.props.setOpened(true)

      return
    }

    const { pendingSend } = this.props.payments
    this.props.sendEca(pendingSend.amount, pendingSend.to)
    this.props.clearSendCardFields()
    this.props.setMessageAndBadge(SENDING_IN_PROGRESS, PENDING)
  }

  onCopy = (): void => {
    this.props.setMessageAndBadge(COPIED_ADDRESS, SUCCESS)
  }

  setAmount = (event: any): void => {
    const { value } = event.target
    this.props.setAmount(value)
  }

  setToAddress = (event: any): void => {
    const { value } = event.target
    this.props.setToAddress(value)
  }

  public render(): any {
    const addresses: WalletAddress[]  = this.props.payments.addresses
    const { pendingSend } = this.props.payments

    return (
      <div className='c-view'>
        <div className='c-view__header'>
          <h2>Payments</h2>
        </div>
        <div className='c-grid c-grid--halves py-4'>
          <SendCardView
            address={pendingSend.to}
            amount={pendingSend.amount}
            onClick={this.onClick}
            setToAddress={this.setToAddress}
            setAmount={this.setAmount} />
          <ReceiveCardView addresses={addresses} onClick={this.onCopy} />
        </div>
        <UnlockModal />
      </div>
    )
  }
}

export default connect<StateProps, DispatchProps, {}>(mapStateToProps, mapDispatchToProps)(Payments)
