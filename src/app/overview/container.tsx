import { WalletTransaction } from 'electra-js'
import { get, take } from 'lodash'
import * as React from 'react'
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import TransactionsComponent from '../common/transactions/transactions'
import { getTransactions } from '../transactions/actions'
import { getCurrentPriceInBTC, getCurrentPriceInUSD, getGlobalBalance } from './actions'
import CardViewPrices from './components/card-view-prices'
import { DispatchProps, StateProps } from './types'

// const MAX_DECIMALS: number = 8
const TRANSACTIONS_COUNT = 10

const mapStateToProps: MapStateToProps<StateProps, {}, {}> = (state: StateProps): StateProps => ({
  overview: state.overview,
  transactions: state.transactions,
})

const mapDispatchToProps: MapDispatchToProps<DispatchProps, {}> = (dispatch: Dispatch<StateProps>): DispatchProps =>
  bindActionCreators(
    {
      getCurrentPriceInBTC,
      getCurrentPriceInUSD,
      getGlobalBalance,
      getTransactions,
    },
    dispatch,
  )

class Overview extends React.Component<StateProps & DispatchProps, any> {
  componentDidMount(): void {
    this.props.getCurrentPriceInUSD()
    this.props.getCurrentPriceInBTC()
    this.props.getTransactions()
    this.props.getGlobalBalance()
  }

  render(): any {
    const transactions: WalletTransaction[] = take(get(this.props, 'transactions.transactions', []), TRANSACTIONS_COUNT)

    return (
      <div className='c-view'>
        <div className='c-view__header'>
          <h2 className='first'>Overview</h2>
        </div>
        <div className='c-view__content'>
          <CardViewPrices
            confirmedBalance={this.props.overview.confirmedBalance}
            unconfirmedBalance={this.props.overview.unconfirmedBalance}
            confirmedBalanceInBTC={this.props.overview.confirmedBalance * this.props.overview.currentPriceBTC}
            unconfirmedBalanceInBTC={this.props.overview.unconfirmedBalance * this.props.overview.currentPriceBTC}
            confirmedBalanceInUSD={this.props.overview.confirmedBalance * this.props.overview.currentPriceUSD}
            unconfirmedBalanceInUSD={this.props.overview.unconfirmedBalance * this.props.overview.currentPriceUSD} />

          <h2>Recent Transactions</h2>
          <TransactionsComponent transactions={transactions} />
        </div>
      </div>
    )
  }
}

export default connect<StateProps, DispatchProps, {}>(mapStateToProps, mapDispatchToProps)(Overview)
