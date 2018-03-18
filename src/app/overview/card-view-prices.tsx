import * as React from 'react'

import CardView from './card-view'

export default class CardViewPrices extends React.Component<any, any> {
  public render(): any {
    const { globalBalance, ecaInBTC, ecaInUSD, currentPriceBTC, currentPriceUSD } = this.props

    return (
      <div className='c-grid c-grid--thirds py-4'>
        <CardView price={globalBalance} bottomPrice={''} currency='ECA' />
        <CardView price={ecaInBTC} bottomPrice={currentPriceBTC} currency='BTC' />
        <CardView price={ecaInUSD} bottomPrice={currentPriceUSD} currency='USD' />
      </div>
    )
  }
}
