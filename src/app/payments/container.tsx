import { WalletAddress } from 'electra-js'
import * as React from 'react'
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import { setMessageAndBadge } from '../common/toast/actions'
import { COPIED_ADDRESS, PENDING, SENDING_IN_PROGRESS, SUCCESS } from '../common/toast/toast-messages'
import { clearSendCardFields, getAddresses, sendEca, setAmount, setToAddress } from './actions'
import ReceiveCardView from './components/receive-card-view'
import SendCardView from './components/send-card-view'
import { DispatchProps, StateProps } from './types'

// tslint:disable-next-line:typedef
const mapStateToProps: MapStateToProps<StateProps,{}, {}> = (state: StateProps): StateProps => ({
  payments: state.payments
})

// tslint:disable-next-line:typedef
const mapDispatchToProps: MapDispatchToProps<DispatchProps, {}> =
(dispatch: Dispatch<StateProps>): DispatchProps =>
  bindActionCreators({
    clearSendCardFields,
    getAddresses,
    sendEca,
    setAmount,
    setMessageAndBadge,
    setToAddress
    // tslint:disable-next-line:align
  }, dispatch)

class Payments extends React.Component<StateProps & DispatchProps, any> {
  componentDidMount(): void {
    this.props.getAddresses()
  }

  onClick = (): void => {
    const { amount, to } = this.props.payments.pendingSend
    this.props.sendEca(amount, to)
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
    const { amount, to } = this.props.payments.pendingSend

    return (
      <div className='c-view'>
        <div className='c-view__header'>
          <h2>Payments</h2>
        </div>
        <div className='c-grid c-grid--halves py-4'>
          <SendCardView
            address={to}
            amount={amount}
            onClick={this.onClick}
            setToAddress={this.setToAddress}
            setAmount={this.setAmount} />
          <ReceiveCardView addresses={addresses} onClick={this.onCopy} />
        </div>
      </div>
    )
  }
}

export default connect<StateProps, DispatchProps, {}>(mapStateToProps, mapDispatchToProps)(Payments)
