import { WalletAddress, WalletAddressCategory } from 'electra-js'
import * as QRCode from 'qrcode.react'
import * as React from 'react'
import * as CopyToClipboard from 'react-copy-to-clipboard'

interface OwnProps {
  addresses: WalletAddress[]
  onCopy(): void
}

interface OwnState {
  selectedAddressHash: string
}

const CATEGORY: string[] = [
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
      selectedAddressHash: '',
    }
  }

  public static getDerivedStateFromProps(
    { addresses }: OwnProps,
    { selectedAddressHash }: OwnState,
  ): Partial<OwnState> | null {
    if (selectedAddressHash === '' && addresses.length !== 0) {
      return { selectedAddressHash: addresses[0].hash }
    }

    return null
  }

  private onChange(): void {
    this.setState({ selectedAddressHash: this.$addresses.value })
  }

  public render(): JSX.Element {
    return (
      <div className='o-grid__item'>
        <div className='c-card'>
          <div className='c-card__content'>
            <h3>Receive ECA</h3>
            <div className='my-4'>
              <div className='c-dropdown'>
                <select onChange={this.onChange.bind(this)} ref={(node: HTMLSelectElement) => this.$addresses = node}>
                  {this.props.addresses.map((address: WalletAddress) =>
                    <option
                      // tslint:disable-next-line:no-unnecessary-type-assertion
                      children={`[${CATEGORY[address.category as WalletAddressCategory]}] ${address.hash}`}
                      key={address.hash}
                      value={address.hash}
                    />,
                  )}
                </select>
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
