import { WalletAddress } from 'electra-js'
import { isEmpty } from 'lodash'
import * as QRCode from 'qrcode.react'
import * as React from 'react'
import * as CopyToClipboard from 'react-copy-to-clipboard'
import { Icon } from '../../shared/icon'

interface ComponentProps {
  addresses: WalletAddress[]
  onCopy(): void
}

interface ComponentState {
  selectedAddress: string
}

const CATEGORY: any = [
  'Purse',
  'Checking Account',
  'Savings Account',
  'Legacy Account',
]

export default class ReceiveCardView extends React.PureComponent<ComponentProps, ComponentState> {
  constructor(props: ComponentProps) {
    super(props)
    this.state = {
      selectedAddress: '',
    }
  }

  onChange(event: any): void {
    this.setState({
      selectedAddress: event.target.value,
    })
  }

  componentWillReceiveProps(newProps: any): void {
    if (!isEmpty(newProps.addresses) && isEmpty(this.state.selectedAddress)) {
      this.setState({
        selectedAddress: `[${CATEGORY[newProps.addresses[0].category]}] ${newProps.addresses[0].hash}`,
      })
    }
  }

  public render(): JSX.Element {
    return (
      <div className='c-grid__item'>
        <div className='c-card'>
          <div className='c-card__content'>
            <h3>Receive ECA</h3>
            <div className='my-4'>
              <div className='c-dropdown'>
                <select onChange={this.onChange.bind(this)}>
                  {(this.props.addresses || [])
                    // tslint:disable-next-line:no-magic-numbers
                    .filter(({ category }: WalletAddress) => category !== 3)
                    .map((address: WalletAddress) => address.category !== null
                      ? <option
                        children={`[${CATEGORY[address.category]}] ${address.hash}`}
                        key={address.hash}
                        value={address.hash}
                      />
                      : null,
                    )
                  }
                </select>
                <div className='c-icon c-dropdown__icon'>
                  <Icon name='caret-bottom' />
                </div>
              </div>
              <div className='c-qr-code mt-8'>
                <QRCode value={this.state.selectedAddress} />
              </div>
            </div>
          </div>
          <div className='c-card__actions'>
            <CopyToClipboard
              onCopy={() => this.props.onCopy()}
              text={this.state.selectedAddress}>
              <button>COPY THIS ADDRESS</button>
            </CopyToClipboard>
          </div>
        </div>
      </div>
    )
  }
}
