import { mapValues } from 'lodash'
import * as React from 'react'
const { connect } = require('react-redux')
import { bindActionCreators, Dispatch } from 'redux'

import { getTransactions } from '../transactions/actions'
import { getCurrentPriceInBTC, getCurrentPriceInUSD, getGlobalBalance } from './actions'
import CardViewPrices from './components/card-view-prices'
import LastTransactions from './components/last-transactions'
import { DispatchProps, State, State as Props } from './types'

const MAX_DECIMALS: number = 8

// tslint:disable-next-line:typedef
const mapStateToProps = (state: State): Props =>
  ({
    overview: state.overview,
    transactions: state.transactions
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
    const transactions: any = this.props.transactions.transactions || []

    return (
      <div className='c-view'>
        <div className='c-view__header'>
          <h2>Overview</h2>
        </div>
        <div className='c-view__content'>
          <CardViewPrices
            globalBalance={values.globalBalance}
            ecaInBTC={(values.currentPriceBTC * values.globalBalance).toFixed(MAX_DECIMALS)}
            ecaInUSD={(values.currentPriceUSD * values.globalBalance).toFixed(MAX_DECIMALS)}
            currentPriceBTC={values.currentPriceBTC}
            currentPriceUSD={values.currentPriceUSD} />

          <h2>Last Transactions</h2>
          <LastTransactions transactions={transactions}/>
        </div>
      </div>
    )
  }
}
