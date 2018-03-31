import * as React from 'react'

export default class CardView extends React.Component<any, any> {
  public render(): any {
    const { bottomPrice, currency, price } = this.props

    return (
      <div className='c-grid__item'>
        <div className='c-card'>
          <div className='c-card__content text-center'>
            <span className='block text-3xl font-extra-bold'>{price}</span>
            <span className='text-grey'>{bottomPrice}&nbsp;</span>
            <span className='block text-lg text-purple font-semi-bold'>{currency}</span>
          </div>
        </div>
      </div>
    )
  }
}
