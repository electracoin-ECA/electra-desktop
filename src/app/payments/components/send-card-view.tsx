import * as React from 'react'

const styles: any = require('./styles.css')

interface ComponentProps {
  addressError: string | undefined
  amountError: string | undefined
  onPaymentSubmit(amount: number, toAddress: string): void
}

export default class SendCardView extends React.PureComponent<ComponentProps> {
  private $amount: HTMLInputElement
  private $toAddress: HTMLInputElement

  public render(): any {
    return (
      <div className='c-grid__item'>
        <div className='c-card'>
          <div className='c-card__content'>
            <h3>Send ECA</h3>
            <div className='my-4'>
              <div className={`c-input ${this.props.addressError && styles.inputError}`}>
                <span className='c-input__label'>Wallet Address</span>
                <input
                  placeholder='EH123asaeGsearuWWLbKToRdmnoS8BGD9hGC'
                  ref={(node: HTMLInputElement) => this.$toAddress = node}
                  type='text'
                />
              </div>
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
              onClick={() => this.props.onPaymentSubmit(Number(this.$amount.value), this.$toAddress.value)}
            />
          </div>
        </div>
      </div>
    )
  }
}
