import { drop, mapValues } from 'lodash'
import * as React from 'react'
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import TransactionsComponent from '../common/transactions/transactions'
import { getTransactions } from '../transactions/actions'
import { getCurrentPriceInBTC, getCurrentPriceInUSD } from './actions'
import CardViewPrices from './components/card-view-prices'
import { DispatchProps, StateProps } from './types'

const MAX_DECIMALS: number = 8
const TRANSACTIONS_COUNT: number = 10

const mapStateToProps: MapStateToProps<StateProps,{}, {}> = (state: StateProps): StateProps => ({
  overview: state.overview,
  transactions: state.transactions
})

const mapDispatchToProps: MapDispatchToProps<DispatchProps, {}> =
(dispatch: Dispatch<StateProps>): DispatchProps =>
  bindActionCreators({
    getCurrentPriceInBTC,
    getCurrentPriceInUSD,
    getTransactions},dispatch)

class Overview extends React.Component<StateProps & DispatchProps, any> {
  public componentDidMount(): void {
    this.props.getCurrentPriceInUSD()
    this.props.getCurrentPriceInBTC()
    this.props.getTransactions()
  }

  public render(): any {
    const values: any = mapValues(this.props.overview, (value: string) => parseFloat(value).toFixed(MAX_DECIMALS))
    let { transactions } = this.props.transactions
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
          <TransactionsComponent transactions={transactions} />
        </div>
      </div>
    )
  }
}

export default connect<StateProps, DispatchProps, {}>(mapStateToProps, mapDispatchToProps)(Overview)
