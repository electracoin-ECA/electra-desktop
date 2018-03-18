import * as React from 'react'

export default class SendCardView extends React.Component<any, any> {
  public render(): any {
    const { onClick, setToAddress, setAmount, amount, address } = this.props

    return (
      <div className='c-grid__item text-center bg-grey-lightest'>
        <div className='c-card'>
          <div className='c-card__content'>
            <h3>Send ECA</h3>
            <div className='my-4'>
              <div className='c-input'>
                <span className='c-input__label'>Wallet Address</span>
                <input type='text' placeholder='EH123asaeGsearuWWLbKToRdmnoS8BGD9hGC'
                  onChange={setToAddress} value={address} />
              </div>
              <div className='c-input'>
                <span className='c-input__label'>Amount</span>
                <input type='number' placeholder='ECA' value={amount} onChange={setAmount} />
              </div>
            </div>
          </div>
          <div className='c-card__actions'>
            <button onClick={onClick}>Submit payment</button>
          </div>
        </div>
      </div>
    )
  }
}
