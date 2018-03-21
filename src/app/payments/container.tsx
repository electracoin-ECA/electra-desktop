import * as React from 'react'
import { DispatchProps, State, State as Props } from './types'
const { connect } = require('react-redux')
import { get } from 'lodash'
import { bindActionCreators, Dispatch } from 'redux'

import { setMessageAndBadge } from '../common/toast/actions'
import { COPIED_ADDRESS, PENDING, SENDING_IN_PROGRESS, SUCCESS } from '../common/toast/toast-messages'
import { clearSendCardFields, sendEca, setAmount, setToAddress } from './actions'
import ReceiveCardView from './components/receive-card-view'
import SendCardView from './components/send-card-view'

// tslint:disable-next-line:typedef
const mapStateToProps = (state: State): Props =>
  ({
    addresses: get(state, 'electra.electraJs.wallet.ADDRESSES', []),
    payments: state.payments
  })

// tslint:disable-next-line:typedef
const mapDispatchToProps = (dispatch: Dispatch<{}>): DispatchProps =>
  bindActionCreators({
    clearSendCardFields,
    sendEca,
    setAmount,
    setMessageAndBadge,
    setToAddress
    // tslint:disable-next-line:align
  }, dispatch)

@connect(mapStateToProps, mapDispatchToProps)
export default class Payments extends React.Component<Props & DispatchProps, any> {
  onClick = (): void => {
    this.props.sendEca()
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
    const address: string = get(this.props, 'addresses[0].hash', '')
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
          <ReceiveCardView address={address} onClick={this.onCopy} />
        </div>
      </div>
    )
  }
}
