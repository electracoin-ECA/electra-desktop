import { WalletAddressCategory, WalletTransaction } from 'electra-js'
import { get, take } from 'lodash'
import * as numeral from 'numeral'
import * as React from 'react'
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'

import TransactionsComponent from '../common/transactions/transactions'
import { getTransactions } from '../transactions/actions'
import dispatchers from './actions'
import CardViewPrices from './components/card-view-prices'
import { DispatchProps, OwnProps, StateProps } from './types'

const styles = require('./styles.css')

const LOOP_INTERVAL = 5_000
const PURSE_MAXIMUM_AMOUNT = 1_000
const TRANSACTIONS_COUNT = 10

const mapStateToProps: MapStateToProps<StateProps, {}, {}> = (state: StateProps) => ({ ...state })

const mapDispatchToProps: MapDispatchToProps<DispatchProps, OwnProps> =
  (dispatch: Dispatch<StateProps>): DispatchProps =>
    bindActionCreators(
      {
        ...dispatchers,
        getTransactions,
      },
      dispatch,
    )

class Overview extends React.Component<StateProps & DispatchProps & OwnProps> {
  private category: WalletAddressCategory | null
  // tslint:disable-next-line:typedef
  private isSwitchingCategory = true

  public componentDidMount(): void {
    this.props.getCurrentPriceInUSD()
    this.props.getCurrentPriceInBTC()
    this.props.getTransactions(this.props.category)
    this.props.getBalance(this.props.category)
  }

  public UNSAFE_componentWillReceiveProps({ category }: StateProps & DispatchProps & OwnProps): void {
    if ((category === undefined && this.category !== null) || (category !== undefined && category !== this.category)) {
      this.category = category === undefined ? null : category
      this.isSwitchingCategory = true

      return
    }

    setTimeout(LOOP_INTERVAL, () => {
      this.props.getTransactions(this.props.category)
      this.props.getBalance(this.props.category)
    })

    this.isSwitchingCategory = false
  }

  render(): any {
    const transactions: WalletTransaction[] = take(get(this.props, 'transactions.transactions', []), TRANSACTIONS_COUNT)
    let title: string
    switch (this.props.category) {
      case 0:
        title = 'Purse'
        break

      case 1:
        title = 'Checking Account'
        break

      // tslint:disable-next-line:no-magic-numbers
      case 2:
        title = 'Savings Account'
        break

      // tslint:disable-next-line:no-magic-numbers
      case 3:
        title = 'Legacy Account'
        break

      default:
        title = 'Overview'
    }

    return (
      <div className='c-view'>
        <div className='c-view__header'>
          <h2 className='first'>{title}</h2>
        </div>
        <div className='c-view__content'>
          <CardViewPrices
            confirmedBalance={this.props.overview.confirmedBalance}
            unconfirmedBalance={this.props.overview.unconfirmedBalance}
            confirmedBalanceInBTC={this.props.overview.confirmedBalance * this.props.overview.currentPriceBTC}
            unconfirmedBalanceInBTC={this.props.overview.unconfirmedBalance * this.props.overview.currentPriceBTC}
            confirmedBalanceInUSD={this.props.overview.confirmedBalance * this.props.overview.currentPriceUSD}
            unconfirmedBalanceInUSD={this.props.overview.unconfirmedBalance * this.props.overview.currentPriceUSD} />

          {this.props.category === 0 &&
          (this.props.overview.confirmedBalance + this.props.overview.unconfirmedBalance) > PURSE_MAXIMUM_AMOUNT && (
            <div className={styles.warning}>
              <div className={styles.warningTitle}>Warning</div>
              It is not advised to keep more than {numeral(PURSE_MAXIMUM_AMOUNT).format('0,0')} ECAs in your purse.
            </div>
          )}

          <h2>Recent Transactions</h2>
          {this.isSwitchingCategory
            ? <div className='mt-6' style={{ paddingTop: '10px' }}><p>Loading...</p></div>
            : <TransactionsComponent category={this.props.category} transactions={transactions} />
          }

        </div>
      </div>
    )
  }
}

export default connect<StateProps, DispatchProps, OwnProps>(mapStateToProps, mapDispatchToProps)(Overview)
