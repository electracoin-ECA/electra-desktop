import { WalletAddress, WalletAddressCategory } from 'electra-js'
import * as QRCode from 'qrcode.react'
import * as React from 'react'
import * as CopyToClipboard from 'react-copy-to-clipboard'
import { Icon } from '../../shared/icon'

interface OwnProps {
  addresses: WalletAddress[]
  onCopy(): void
}

interface OwnState {
  selectedAddressHash: string
}

const CATEGORY: any = [
  'Purse',
  'Checking Account',
  'Savings Account',
  'Legacy Account',
]

export default class ReceiveCardView extends React.PureComponent<OwnProps, OwnState> {
  private $addresses: HTMLSelectElement
  public constructor(props: OwnProps) {
    super(props)

    this.state = {
      selectedAddressHash: props.addresses[0].hash,
    }
  }

  private onChange(): void {
    this.setState({ selectedAddressHash: this.$addresses.value })
  }

  public render(): JSX.Element {
    return (
      <div className='c-grid__item'>
        <div className='c-card'>
          <div className='c-card__content'>
            <h3>Receive ECA</h3>
            <div className='my-4'>
              <div className='c-dropdown'>
                <select onChange={this.onChange.bind(this)} ref={(node: HTMLSelectElement) => this.$addresses = node}>
                  {this.props.addresses.map((address: WalletAddress) =>
                    <option
                      children={`[${CATEGORY[address.category as WalletAddressCategory]}] ${address.hash}`}
                      key={address.hash}
                      value={address.hash}
                    />,
                  )}
                </select>
                <div className='c-icon c-dropdown__icon'>
                  <Icon name='caret-bottom' />
                </div>
              </div>
              <div className='c-qr-code mt-8'>
                <QRCode value={this.state.selectedAddressHash} />
              </div>
            </div>
          </div>
          <div className='c-card__actions'>
            <CopyToClipboard
              onCopy={() => this.props.onCopy()}
              text={this.state.selectedAddressHash}>
              <button>COPY THIS ADDRESS</button>
            </CopyToClipboard>
          </div>
        </div>
      </div>
    )
  }
}
