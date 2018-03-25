import { WalletAddress } from 'electra-js'
import * as QRCode from 'qrcode.react'
import * as React from 'react'
import * as CopyToClipboard from 'react-copy-to-clipboard'
import { Icon } from '../../icon'

export default class ReceiveCardView extends React.Component<any, any> {
  constructor(props: object) {
    super(props)
    this.state = {
      selectedAddress: ''
    }
  }

  onChange = (event: object) => {
    this.setState({
      selectedAddress: event.target.value
    })
  }

  componentWillReceiveProps(newProps: object) {
    if (newProps.addresses.length && this.state.selectedAddress === '') {
      this.setState({
        selectedAddress: newProps.addresses[0].hash
      })
    }
  }

  public render(): any {
    const { addresses, onClick } = this.props
    const options: JSX.Element[] = addresses.map((address: WalletAddress) =>
      <option key={address.hash} value={address.hash}>{address.hash}</option>
    )

    return (
      <div className='c-grid__item text-center bg-grey-lightest'>
        <div className='c-card'>
          <div className='c-card__content'>
            <h3>Receive ECA</h3>
            <div className='my-4'>
              <div className='c-dropdown'>
                <select onChange={this.onChange}> {options} </select>
                <div className='c-icon c-dropdown__icon'>
                  <Icon name='caret-down' />
                </div>
              </div>
              <div className='c-qr-code mt-8'>
                <QRCode value={this.state.selectedAddress} />
              </div>
            </div>
          </div>
          <div className='c-card__actions'>
            <CopyToClipboard
              text={this.state.selectedAddress}>
              <button onClick={onClick}>Copy wallet address</button>
            </CopyToClipboard>
          </div>
        </div>
      </div>
    )
  }
}
