import * as QRCode from 'qrcode.react'
import * as React from 'react'
import * as CopyToClipboard from 'react-copy-to-clipboard'
import { Icon } from '../../icon'

export default class ReceiveCardView extends React.Component<any, any> {
  public render(): any {
    const { address, onClick } = this.props

    return (
      <div className='c-grid__item text-center bg-grey-lightest'>
        <div className='c-card'>
          <div className='c-card__content'>
            <h3>Receive ECA</h3>
            <div className='my-4'>
              <div className='c-dropdown'>
                <select>
                  <option id='address' value='walletA'>{address}</option>
                </select>
                <div className='c-icon c-dropdown__icon'>
                  <Icon name='caret-down' />
                </div>
              </div>
              <div className='c-qr-code mt-8'>
                <QRCode value={address} />
              </div>
            </div>
          </div>
          <div className='c-card__actions'>
            <CopyToClipboard
              text={address}>
              <button onClick={onClick}>Copy wallet address</button>
            </CopyToClipboard>
          </div>
        </div>
      </div>
    )
  }
}
