import { WalletAddress, WalletAddressCategory, WalletTransaction } from 'electra-js'
import { get, take } from 'lodash'
import * as React from 'react'
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'

import ElectraJsMiddleware from '../../middlewares/ElectraJs'
import TransactionsComponent from '../common/transactions/transactions'
import { getTransactions } from '../transactions/actions'
import dispatchers from './actions'
import CardViewPrices from './components/card-view-prices'
import { DispatchProps, OwnProps, StateProps } from './types'

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
  private category: WalletAddressCategory | undefined

  public componentDidMount(): void {
    this.props.getCurrentPriceInUSD()
    this.props.getCurrentPriceInBTC()
    this.props.getTransactions(this.props.category)
    this.props.getBalance(this.props.category)
  }

  public UNSAFE_componentWillReceiveProps({ category }: StateProps & DispatchProps & OwnProps): void {
    if (category !== this.category) this.props.toggleOnTransactionsLoading()
    this.category = category
  }

  render(): any {
    const transactions: WalletTransaction[] = take(get(this.props, 'transactions.transactions', []), TRANSACTIONS_COUNT)
    let title: string
    let addresses: WalletAddress[] | undefined
    switch (this.props.category) {
      case 0:
        title = 'Purse'
        addresses = ElectraJsMiddleware.wallet.purseAddresses
        break

      case 1:
        title = 'Checking Account'
        addresses = ElectraJsMiddleware.wallet.checkingAddresses
        break

      // tslint:disable-next-line:no-magic-numbers
      case 2:
        title = 'Savings Account'
        addresses = ElectraJsMiddleware.wallet.savingsAddresses
        break

      // tslint:disable-next-line:no-magic-numbers
      case 3:
        title = 'Legacy Account'
        addresses = ElectraJsMiddleware.wallet.randomAddresses
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

          {this.props.category !== undefined && (
            <div>
              <h2>Addresses</h2>
              <ul className='mt-6'>
                {(addresses as WalletAddress[]).map(({ hash }: WalletAddress) => (
                  <li children={hash} className='selectableText' />
                ))}
              </ul>
            </div>
          )}

          <h2>Recent Transactions</h2>
          {this.props.overview.isLoading
            ? <div className='mt-6' style={{ paddingTop: '10px' }}><p>Loading...</p></div>
            : <TransactionsComponent category={this.props.category} transactions={transactions} />
          }

        </div>
      </div>
    )
  }
}

export default connect<StateProps, DispatchProps, OwnProps>(mapStateToProps, mapDispatchToProps)(Overview)
