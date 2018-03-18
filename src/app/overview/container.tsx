import { mapValues } from 'lodash'
import * as React from 'react'
const { connect } = require('react-redux')
import { bindActionCreators, Dispatch } from 'redux'

import { getTransactions } from '../transactions/actions'
import { getCurrentPriceInBTC, getCurrentPriceInUSD, getGlobalBalance } from './actions'
import CardViewPrices from './card-view-prices'
import LastTransactions from './last-transactions'
import { DispatchProps, State, State as Props } from './types'

const MAX_DECIMALS: number = 8

// tslint:disable-next-line:typedef
const mapStateToProps = (state: State): Props =>
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
export default class Overview extends React.Component<Props & DispatchProps, any> {
  public componentDidMount(): void {
    this.props.getCurrentPriceInUSD()
    this.props.getCurrentPriceInBTC()
    this.props.getTransactions()
  }

  public render(): any {
    const values: any = mapValues(this.props.overview, (value: string) => parseFloat(value).toFixed(MAX_DECIMALS))

    return (
      <div>
        <h3>Overview</h3>
        <CardViewPrices
          globalBalance={values.globalBalance}
          ecaInBTC={(values.currentPriceBTC * values.globalBalance).toFixed(MAX_DECIMALS)}
          ecaInUSD={(values.currentPriceUSD * values.globalBalance).toFixed(MAX_DECIMALS)}
          currentPriceBTC={values.currentPriceBTC}
          currentPriceUSD={values.currentPriceUSD} />

        <h3>Last Transactions</h3>
        <LastTransactions />
      </div>
    )
  }
}
