import { drop, mapValues } from 'lodash'
import * as React from 'react'
const { connect } = require('react-redux')
import { bindActionCreators, Dispatch } from 'redux'

import TransactionsComponent from '../common/transactions'
import { getCurrentPriceInBTC, getCurrentPriceInUSD } from './actions'
import CardViewPrices from './components/card-view-prices'
import { DispatchProps, State, State as Props } from './types'

const MAX_DECIMALS: number = 8
const TRANSACTIONS_COUNT: number = 10
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
    getCurrentPriceInUSD
    // tslint:disable-next-line:align
  }, dispatch)

@connect(mapStateToProps, mapDispatchToProps)
export default class Overview extends React.Component<Props & DispatchProps, any> {
  public componentDidMount(): void {
    this.props.getCurrentPriceInUSD()
    this.props.getCurrentPriceInBTC()
  }

  public render(): any {
    const values: any = mapValues(this.props.overview, (value: string) => parseFloat(value).toFixed(MAX_DECIMALS))
    let { transactions }: any = this.props.transactions
    transactions = transactions ? drop(transactions, transactions.length - TRANSACTIONS_COUNT) : []

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
          <TransactionsComponent transactions={transactions}/>
        </div>
      </div>
    )
  }
}
