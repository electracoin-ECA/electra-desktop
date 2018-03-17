import * as React from 'react'
import { DispatchProps, State, State as Props } from './types'

const { connect } = require('react-redux')
import { bindActionCreators, Dispatch } from 'redux'

import { getCurrentPriceInBTC, getCurrentPriceInUSD, getGlobalBalance } from './actions'
import { getTransactions } from '../transactions/actions'

// tslint:disable-next-line:typedef
const mapStateToProps  = (state: State): Props =>
({
  overview: state.overview
})

// tslint:disable-next-line:typedef
const mapDispatchToProps = (dispatch: Dispatch<{}>): DispatchProps =>
  bindActionCreators({
    getCurrentPriceInBTC,
    getCurrentPriceInUSD,
    getGlobalBalance,
    getTransactions
// tslint:disable-next-line:align
}, dispatch)

@connect(mapStateToProps, mapDispatchToProps)
export default class Overview extends React.Component<Props &DispatchProps, any> {
  public componentDidMount(): void {
    this.props.getCurrentPriceInUSD()
    this.props.getCurrentPriceInBTC()
    this.props.getTransactions()
  }

  public render(): any {
    const { globalBalance, currentPriceBTC, currentPriceUSD }  = this.props.overview

    return (
      <div>
      <h3>Overview</h3>
      <h6>Global Balance: {globalBalance}</h6>
      <h6>In BTC: {currentPriceBTC * globalBalance}</h6>
      <h6> Current price in BTC: {currentPriceBTC}</h6>
      <h6>In USD: {currentPriceUSD * globalBalance}</h6>
      <h6> Current price in USD: {currentPriceUSD}</h6>
      </div>
    )
  }
}
