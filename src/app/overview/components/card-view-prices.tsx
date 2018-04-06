import * as React from 'react'

import CardView from './card-view'

interface ComponentProps {
  confirmedBalance: number
  unconfirmedBalance: number
  confirmedBalanceInBTC: number
  unconfirmedBalanceInBTC: number
  confirmedBalanceInUSD: number
  unconfirmedBalanceInUSD: number
}

export default class CardViewPrices extends React.Component<ComponentProps> {
  public render(): any {
    return (
      <div className='c-grid c-grid--thirds py-4'>
        <CardView
          confirmedBalance={this.props.confirmedBalance}
          unconfirmedBalance={this.props.unconfirmedBalance}
          currencyName='ECA'
        />
        <CardView
          confirmedBalance={this.props.confirmedBalanceInBTC}
          unconfirmedBalance={this.props.unconfirmedBalanceInBTC}
          currencyName='BTC'
        />
        <CardView
          confirmedBalance={this.props.confirmedBalanceInUSD}
          unconfirmedBalance={this.props.unconfirmedBalanceInUSD}
          currencyName='USD'
        />
      </div>
    )
  }
}
