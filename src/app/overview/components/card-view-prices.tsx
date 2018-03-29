import * as React from 'react'

import CardView from './card-view'

export default class CardViewPrices extends React.Component<any, any> {
  public render(): any {
    const { confirmedBalance, ecaInBTC, ecaInUSD, currentPriceBTC, currentPriceUSD, unconfirmedBalance } = this.props

    return (
      <div className='c-grid c-grid--thirds py-4'>
        <CardView price={confirmedBalance} bottomPrice={unconfirmedBalance} currency='ECA' />
        <CardView price={ecaInBTC} bottomPrice={currentPriceBTC} currency='BTC' />
        <CardView price={ecaInUSD} bottomPrice={currentPriceUSD} currency='USD' />
      </div>
    )
  }
}
