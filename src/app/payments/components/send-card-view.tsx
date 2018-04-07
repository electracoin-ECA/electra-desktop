import * as React from 'react'

interface ComponentProps {
  onPaymentSubmit(toAddress: string, amount: number): void
}

export default class SendCardView extends React.PureComponent<ComponentProps> {
  private $toAddress: HTMLInputElement
  private $amount: HTMLInputElement

  public render(): any {
    return (
      <div className='c-grid__item'>
        <div className='c-card'>
          <div className='c-card__content'>
            <h3>Send ECA</h3>
            <div className='my-4'>
              <div className='c-input'>
                <span className='c-input__label'>Wallet Address</span>
                <input
                  placeholder='EH123asaeGsearuWWLbKToRdmnoS8BGD9hGC'
                  ref={(node: HTMLInputElement) => this.$toAddress = node}
                  type='text'
                />
              </div>
              <div className='c-input'>
                <span className='c-input__label'>Amount</span>
                <input
                  placeholder='0.00'
                  ref={(node: HTMLInputElement) => this.$amount = node}
                  type='number'
                />
              </div>
            </div>
          </div>
          <div className='c-card__actions'>
            <button
              children={'Submit payment'}
              onClick={() => this.props.onPaymentSubmit(this.$toAddress.value, Number(this.$amount.value))}
            />
          </div>
        </div>
      </div>
    )
  }
}
