import * as React from 'react'
import { DispatchProps, State, State as Props } from './types'
const { connect } = require('react-redux')
import { get } from 'lodash'
import * as QRCode from 'qrcode.react'
import { bindActionCreators, Dispatch } from 'redux'

import { Icon } from '../icon'
import { sendEca, setAmount, setToAddress } from './actions'

// tslint:disable-next-line:typedef
const mapStateToProps = (state: State): Props =>
  ({
    addresses: get(state, 'electra.electraJs.wallet.ADDRESSES', []),
    payments: state.payments
  })

// tslint:disable-next-line:typedef
const mapDispatchToProps = (dispatch: Dispatch<{}>): DispatchProps =>
  bindActionCreators({
    sendEca,
    setAmount,
    setToAddress
    // tslint:disable-next-line:align
  }, dispatch)

@connect(mapStateToProps, mapDispatchToProps)
export default class Payments extends React.Component<Props & DispatchProps, any> {
  onClick = (): void => {
    this.props.sendEca()
  }

  setAmount = (event: any): void => {
    const { value } = event.target
    this.props.setAmount(value)
  }

  setToAddress = (event: any): void => {
    const { value } = event.target
    this.props.setToAddress(value)
  }

  onCopy = (): void => {
    navigator.clipboard.writeText(get(this.props, 'addresses[0].hash', '')).then(
      () => {
        console.log('Async: Copying to clipboard was successful!')
      },
      (err) => {
        console.error('Async: Could not copy text: ', err)
      })
  }

  public render(): any {
    const address: string = get(this.props, 'addresses[0].hash', '')

    return (
      <div className='c-view'>
        <div className='c-view__header'>
          <h2>Payments</h2>
        </div>
        <div className='c-grid c-grid--halves py-4'>
          <div className='c-grid__item text-center bg-grey-lightest'>
            <div className='c-card'>
              <div className='c-card__content'>
                <h3>Send ECA</h3>
                <div className='my-4'>
                  <div className='c-input'>
                    <span className='c-input__label'>Wallet Address</span>
                    <input type='text' placeholder='EH123asaeGsearuWWLbKToRdmnoS8BGD9hGC'
                      onChange={this.setToAddress} />
                  </div>
                  <div className='c-input'>
                    <span className='c-input__label'>Amount</span>
                    <input type='number' placeholder='ECA' onChange={this.setAmount} />
                  </div>
                </div>
              </div>
              <div className='c-card__actions'>
                <button onClick={this.onClick}>Submit payment</button>
              </div>
            </div>
          </div>
          <div className='c-grid__item text-center bg-grey-lightest'>
            <div className='c-card'>
              <div className='c-card__content'>
                <h3>Receive ECA</h3>
                <div className='my-4'>
                  <div className='c-dropdown'>
                    <select>
                      <option id='address' value='walletA' selected>{address}</option>
                    </select>
                    <div className='c-icon c-dropdown__icon'>
                      <Icon name='caret-down' />
                    </div>
                  </div>
                  <div className='c-qr-code'>
                    <QRCode value={address} />
                  </div>
                </div>
              </div>
              <div className='c-card__actions'>
                <button onClick={this.onCopy}>Copy wallet address</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
