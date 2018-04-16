import { WalletAddressCategory, WalletBalance } from 'electra-js'
import * as React from 'react'

import ElectraJsMiddleware from '../../../middlewares/ElectraJs'
import { Icon } from '../../shared/icon'

const styles: any = require('./styles.css')

interface ComponentProps {
  addressError: string | undefined
  amountError: string | undefined
  onPaymentSubmit(amount: number, fromCategory: WalletAddressCategory, toAddress: string): void
}

interface ComponentState {
  isFromSavingsAccount: boolean
  amountAvailable: string
}

const DECIMALS_LENGTH = 8
const TRANSACTION_FEE = 0.00001

export default class SendCardView extends React.PureComponent<ComponentProps, ComponentState> {
  private $amount: HTMLInputElement
  private $fromCategory: HTMLSelectElement
  private $toAccount: HTMLSelectElement
  private $toAddress: HTMLInputElement

  constructor(props: ComponentProps) {
    super(props)

    this.state = {
      amountAvailable: 'Fetching...',
      isFromSavingsAccount: false,
    }
  }

  public componentDidMount(): void {
    ElectraJsMiddleware.wallet.getCategoryBalance(0)
      .then(({ confirmed }: WalletBalance) => this.setState({
        amountAvailable: Math.max(0, confirmed - TRANSACTION_FEE).toFixed(DECIMALS_LENGTH),
      }))
      .catch(console.error.bind(console))
  }

  private switchFromAccount(): void {
    this.setState({
      amountAvailable: 'Fetching...',
      // tslint:disable-next-line:no-magic-numbers
      isFromSavingsAccount: Number(this.$fromCategory.value) === 2,
    })

    ElectraJsMiddleware.wallet.getCategoryBalance(Number(this.$fromCategory.value))
      .then(({ confirmed }: WalletBalance) => this.setState({
        amountAvailable: Math.max(0, confirmed - TRANSACTION_FEE).toFixed(DECIMALS_LENGTH),
      }))
      .catch(console.error.bind(console))
  }

  private submitPayment(): void {
    let toAddress: string
    switch (Number(this.$toAccount.value)) {
      case 0:
        toAddress = ElectraJsMiddleware.wallet.purseAddresses[0].hash
        break

      case 1:
        toAddress = ElectraJsMiddleware.wallet.checkingAddresses[0].hash
        break

      // tslint:disable-next-line:no-magic-numbers
      case 2:
        toAddress = ElectraJsMiddleware.wallet.savingsAddresses[0].hash
        break

      default:
        toAddress = this.$toAddress.value
    }

    this.props.onPaymentSubmit(
      Number(this.$amount.value),
      Number(this.$fromCategory.value) as WalletAddressCategory,
      toAddress,
    )
  }

  public render(): any {
    return (
      <div className='c-grid__item'>
        <div className='c-card'>
          <div className='c-card__content'>
            <h3>Send ECA</h3>
            <div className='my-4'>
              <div className='c-input'>
                <span className='c-input__label'>From Account</span>
                <div className='c-dropdown'>
                  <select
                    onChange={this.switchFromAccount.bind(this)}
                    ref={(node: HTMLSelectElement) => this.$fromCategory = node}
                  >
                    <option children={`Purse`} key={'fromPurse'} value={0} />
                    <option children={`Checking Account`} key={'fromChecking'} value={1} />
                    {/* tslint:disable-next-line:no-magic-numbers */}
                    <option children={`Savings Account`} key={'fromSavings'} value={2} />
                    {/* tslint:disable-next-line:no-magic-numbers */}
                    <option children={`Legacy Account`} key={'fromRandom'} value={3} />
                  </select>
                  <div className='c-icon c-dropdown__icon'>
                    <Icon name='caret-bottom' />
                  </div>
                </div>
              </div>
              <p className={styles.amountAvailable}>
                Available: <span>{this.state.amountAvailable}</span> ECA
              </p>
              <div className='c-input'>
                <span className='c-input__label'>To Account</span>
                <div className='c-dropdown'>
                  <select ref={(node: HTMLSelectElement) => this.$toAccount = node}>
                    <option key={'none'} value={-1} />
                    <option children={`Purse`} key={'toPurse'} value={0} />
                    <option children={`Checking Account`} key={'toChecking'} value={1} />
                    {/* tslint:disable-next-line:no-magic-numbers */}
                    <option children={`Savings Account`} key={'toSavings'} value={2} />
                  </select>
                  <div className='c-icon c-dropdown__icon'>
                    <Icon name='caret-bottom' />
                  </div>
                </div>
              </div>
              {!this.state.isFromSavingsAccount && (
                <div className={`c-input ${this.props.addressError && styles.inputError}`}>
                  <span className='c-input__label'>[OR] To Address</span>
                  <input
                    placeholder='EH123asaeGsearuWWLbKToRdmnoS8BGD9hGC'
                    ref={(node: HTMLInputElement) => this.$toAddress = node}
                    type='text'
                  />
                </div>
              )}
              {Boolean(this.props.addressError) && <p children={this.props.addressError} className={styles.error} />}
              <div className={`c-input ${this.props.amountError && styles.inputError}`}>
                <span className='c-input__label'>Amount</span>
                <input
                  placeholder='0.00'
                  ref={(node: HTMLInputElement) => this.$amount = node}
                  type='number'
                />
              </div>
              {Boolean(this.props.amountError) && <p children={this.props.amountError} className={styles.error} />}
            </div>
          </div>
          <div className='c-card__actions'>
            <button
              children={'SUBMIT PAYMENT'}
              onClick={this.submitPayment.bind(this)}
            />
          </div>
        </div>
      </div>
    )
  }
}
