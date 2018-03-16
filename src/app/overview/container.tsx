import * as React from 'react'
import { DispatchProps, State, State as Props } from './types'

const { connect } = require('react-redux')
import { bindActionCreators, Dispatch } from 'redux'

import { getCurrentPriceInBTC, getCurrentPriceInUSD, getGlobalBalance } from './actions'

const waitTimeInSeconds: number = 1000 * 10

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
    getGlobalBalance
// tslint:disable-next-line:align
}, dispatch)

@connect(mapStateToProps, mapDispatchToProps)
export default class Overview extends React.Component<Props &DispatchProps, any> {
  public componentDidMount(): void {
    this.triggerIntervalFunction()
  }

  public triggerIntervalFunction = (): void => {
    // tslint:disable-next-line:no-magic-numbers
    setInterval(() => {
      this.props.getCurrentPriceInUSD()
      this.props.getCurrentPriceInBTC()
      this.props.getGlobalBalance()
    // tslint:disable-next-line:align
    }, waitTimeInSeconds)
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
