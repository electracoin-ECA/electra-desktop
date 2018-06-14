import * as numeral from 'numeral'
import * as React from 'react'
import { connect } from 'react-redux'

import { StoreState } from '../types'
import CardViewPrices from './children/card-view-prices'
import Transactions from './children/transactions'
import dispatchers from './dispatchers'
import { Dispatchers, OwnProps } from './types'

const styles = require('./styles.css')

const PURSE_MAXIMUM_AMOUNT = 1_000

class Overview extends React.PureComponent<StoreState & Dispatchers & OwnProps> {
  public constructor(props: StoreState & Dispatchers & OwnProps) {
    super(props)
    this.props.switchAccountCategory(props.category)
  }

  public render(): JSX.Element {
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
            isLoading={this.props.account.isLoading}
            confirmedBalance={this.props.account.confirmedBalance}
            unconfirmedBalance={this.props.account.unconfirmedBalance}
            confirmedBalanceInBTC={this.props.account.confirmedBalance * this.props.account.currentPriceBTC}
            unconfirmedBalanceInBTC={this.props.account.unconfirmedBalance * this.props.account.currentPriceBTC}
            confirmedBalanceInUSD={this.props.account.confirmedBalance * this.props.account.currentPriceUSD}
            unconfirmedBalanceInUSD={this.props.account.unconfirmedBalance * this.props.account.currentPriceUSD}
          />

          {this.props.category === 0 &&
          (this.props.account.confirmedBalance + this.props.account.unconfirmedBalance) > PURSE_MAXIMUM_AMOUNT && (
            <div className={styles.warning}>
              <div className={styles.warningTitle}>Warning</div>
              It is not advised to keep more than {numeral(PURSE_MAXIMUM_AMOUNT).format('0,0')} ECA in your purse.
            </div>
          )}

          {/* tslint:disable-next-line:no-magic-numbers */}
          {/* {this.props.category === 2 && (
            <div className={styles.boxContainer}>
              <div className={styles.box}>
                Estimated Cumulated Interests:
                {this.props.account.savingsCumulatedRewards === undefined
                  ? ' -.-- ECA'
                  : ` ${numeral(this.props.account.savingsCumulatedRewards).format('0,0.00')} ECA`
                }
              </div>
            </div>
          )} */}

          <h2>Recent Transactions</h2>
          {this.props.account.isLoading
            ? <div className='mt-6' style={{ paddingTop: '10px' }}><p>Loading...</p></div>
            : <Transactions category={this.props.category} transactions={this.props.account.transactions} />
          }

        </div>
      </div>
    )
  }
}

export default connect<StoreState, Dispatchers>(
  (state: StoreState) => ({ ...state }),
  dispatchers,
)(Overview)
