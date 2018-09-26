import * as React from 'react'

import CardView from './cardView'

interface ComponentProps {
  confirmedBalance: number
  confirmedBalanceInBTC: number
  confirmedBalanceInUSD: number
  isLoading: boolean
  unconfirmedBalance: number
  unconfirmedBalanceInBTC: number
  unconfirmedBalanceInUSD: number
}

export default class CardViewPrices extends React.Component<ComponentProps> {
  public render(): any {
    return (
      <div className='o-grid o-grid--thirds'>
        <CardView
          confirmedBalance={this.props.confirmedBalance}
          currencyName='ECA'
          isLoading={this.props.isLoading}
          unconfirmedBalance={this.props.unconfirmedBalance}
        />
        <CardView
          confirmedBalance={this.props.confirmedBalanceInBTC}
          currencyName='BTC'
          isLoading={this.props.isLoading}
          unconfirmedBalance={this.props.unconfirmedBalanceInBTC}
        />
        <CardView
          confirmedBalance={this.props.confirmedBalanceInUSD}
          currencyName='USD'
          isLoading={this.props.isLoading}
          unconfirmedBalance={this.props.unconfirmedBalanceInUSD}
        />
      </div>
    )
  }
}
