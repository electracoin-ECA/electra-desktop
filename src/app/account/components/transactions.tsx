import { WalletAddressCategory, WalletTransaction, WalletTransactionEndpoint } from 'electra-js'
import * as moment from 'moment'
import * as R from 'ramda'
import * as React from 'react'

import { Icon } from '../../shared/icon'

const COMPLETED = 100
const CONFIRMATIONS_NEEDED = 10
const DECIMALS_LENGTH = 8
const HALF = 50
const NO_CONFIRMATIONS = 0
const QUARTER = 25
const THREE_QUARTERS = 75

interface Props {
  category: WalletAddressCategory | null
  transactions: WalletTransaction[]
}

interface State {
  expandedTransactions: boolean[]
}

const CATEGORY: any = [
  'Purse',
  'Checking Account',
  'Savings Account',
  'Legacy Account',
]

export default class Transactions extends React.Component<Props, State> {
  public constructor(props: Props) {
    super(props)

    this.state = {
      expandedTransactions: [],
    }
  }

  private toggleExpand(index: number): void {
    const expandedTransactions: boolean[] = [...this.state.expandedTransactions]
    expandedTransactions[index] = !expandedTransactions[index]
    this.setState({ expandedTransactions })
  }

  private getDataProgress(confirmations: number): string {
    const percentage: number = (confirmations * COMPLETED) / CONFIRMATIONS_NEEDED

    if (percentage >= NO_CONFIRMATIONS && percentage < QUARTER) return String(NO_CONFIRMATIONS)
    if (percentage >= QUARTER && percentage < HALF) return String(QUARTER)
    if (percentage >= HALF && percentage < THREE_QUARTERS) return String(HALF)
    if (percentage >= THREE_QUARTERS && percentage < COMPLETED) return String(THREE_QUARTERS)

    return String(COMPLETED)
  }

  public renderReceived(transaction: WalletTransaction, index: number): JSX.Element {
    return (
      <div
        className={`c-card  mb-4 ${this.state.expandedTransactions[index] ? 'expanded' : ''}`}
        key={transaction.hash}
      >
        <div
          className='c-card__content items-center pr-16 pointer-cursor'
          onClick={this.toggleExpand.bind(this, index)}
        >
          <div className='block lg:inline-block mb-4 lg:mr-8 lg:mb-0' style={{ width: '5rem' }}>Received</div>
          <div
            className='block lg:inline-block mb-4 lg:mr-8 lg:mb-0 font-extra-bold'
            style={{ textAlign: 'right', width: '9rem' }}
          >
            {transaction.to
              .filter(({ category }: WalletTransactionEndpoint) => category === this.props.category)
              // tslint:disable-next-line:no-parameter-reassignment
              .reduce((total: number, { amount }: WalletTransactionEndpoint) => total += amount, 0)
              .toFixed(DECIMALS_LENGTH)
            } ECA
          </div>
          <div className='block lg:inline-block lg:float-right pr-6d'>
            <span className='text-grey'>
              <Icon name='calendar-alt' />&nbsp;
              {moment.unix(transaction.date).format('DD-MM-YYYY')}
            </span>
            <span className='text-grey ml-4'>
              <Icon name='clock' />&nbsp;
              {moment.unix(transaction.date).format('LT')}
            </span>
            <p className='text-sm'>
              <span
                className='c-confirmation-indicator mr-3'
                data-progress={this.getDataProgress(transaction.confimationsCount)}
              >
                <span className='c-confirmation-indicator__progress'></span>
              </span>
              {`${Math.min(transaction.confimationsCount, CONFIRMATIONS_NEEDED)} of 10 Confirmations`}
            </p>
          </div>
          <div className='c-card__toggle-icon'>
            <svg className='c-icon c-icon--size-lg inline'>
              <Icon name='caret-bottom' />
            </svg>
          </div>
        </div>
        <div className='c-card__expandable'>
          <span className='block font-semi-bold'>Confirmations</span>
          <p>{transaction.confimationsCount}</p>
          <span className='block font-semi-bold mt-4'>Transaction ID</span>
          <p className='selectableText'>{transaction.hash}</p>
          <span className='block font-semi-bold mt-4'>Sender(s)</span>
          {transaction.from.length === 0
            ? <p>{transaction.type === 'GENERATED' ? 'Interests (Staking Rewards)' : 'Unknown'}</p>
            : transaction.from.map(({ address, amount, category }: WalletTransactionEndpoint) => (
              <p key={`${transaction.hash}-${address}`}>
                <span
                  children={`[${category < 0 ? 'Foreign Account' : CATEGORY[category]}] `}
                  className='selectableText'
                  style={{ display: 'inline-block', width: '10rem' }}
                />
                <span
                  children={address}
                  className='selectableText'
                  style={{ display: 'inline-block', width: '22rem' }}
                />
                <span style={{ color: 'gray' }}>({amount.toFixed(DECIMALS_LENGTH)})</span>
              </p>
            ))
          }
          <span className='block font-semi-bold mt-4'>Recipient</span>
          {transaction.to.map(({ address, amount, category }: WalletTransactionEndpoint) => (
            <p key={`${transaction.hash}-${address}`}>
              <span
                children={`[${category < 0 ? 'Foreign Account' : CATEGORY[category]}] `}
                className='selectableText'
                style={{ display: 'inline-block', width: '10rem' }}
              />
              <span
                children={address}
                className='selectableText'
                style={{ display: 'inline-block', width: '22rem' }}
              />
              <span style={{ color: 'gray' }}>({amount.toFixed(DECIMALS_LENGTH)})</span>
            </p>
          ))}
        </div>
      </div>
    )
  }

  public renderSent(transaction: WalletTransaction, index: number, isPartial: boolean): JSX.Element {
    return (
      <div
        className={`c-card  mb-4 ${this.state.expandedTransactions[index] ? 'expanded' : ''}`}
        key={transaction.hash}
      >
        <div
          className='c-card__content items-center pr-16 pointer-cursor'
          onClick={this.toggleExpand.bind(this, index)}
        >
          <div className='block lg:inline-block mb-4 lg:mr-8 lg:mb-0' style={{ width: '5rem' }}>
            {this.props.category === null ? 'Transfered' : 'Sent'}
          </div>
          <div
            className='block lg:inline-block mb-4 lg:mr-8 lg:mb-0 font-extra-bold'
            style={{ textAlign: 'right', width: '9rem' }}
          >
            {this.props.category !== null ? '-' : ''}
            {this.props.category === null && transaction.amount.toFixed(DECIMALS_LENGTH)}
            {this.props.category !== null && isPartial && transaction.to
              .filter(({ category }: WalletTransactionEndpoint) => category !== this.props.category)
              // tslint:disable-next-line:no-parameter-reassignment
              .reduce((total: number, { amount }: WalletTransactionEndpoint) => total += amount, 0)
              .toFixed(DECIMALS_LENGTH)
            }
            {this.props.category !== null && !isPartial && transaction.from
              .filter(({ category }: WalletTransactionEndpoint) => category === this.props.category)
              // tslint:disable-next-line:no-parameter-reassignment
              .reduce((total: number, { amount }: WalletTransactionEndpoint) => total += amount, 0)
              .toFixed(DECIMALS_LENGTH)
            } ECA
          </div>
          <div className='block lg:inline-block lg:float-right pr-6d'>
            <span className='text-grey'>
              <Icon name='calendar-alt' />&nbsp;
              {moment.unix(transaction.date).format('DD-MM-YYYY')}
            </span>
            <span className='text-grey ml-4'>
              <Icon name='clock' />&nbsp;
              {moment.unix(transaction.date).format('LT')}
            </span>
            <p className='text-sm'>
              <span
                className='c-confirmation-indicator mr-3'
                data-progress={this.getDataProgress(transaction.confimationsCount)}
              >
                <span className='c-confirmation-indicator__progress'></span>
              </span>
              {`${Math.min(transaction.confimationsCount, CONFIRMATIONS_NEEDED)} of 10 Confirmations`}
            </p>
          </div>
          <div className='c-card__toggle-icon'>
            <svg className='c-icon c-icon--size-lg inline'>
              <Icon name='caret-bottom' />
            </svg>
          </div>
        </div>
        <div className='c-card__expandable'>
          <span className='block font-semi-bold'>Confirmations</span>
          <p>{transaction.confimationsCount}</p>
          <span className='block font-semi-bold mt-4'>Transaction ID</span>
          <p className='selectableText'>{transaction.hash}</p>
          <span className='block font-semi-bold mt-4'>Sender(s)</span>
          {transaction.from.length === 0
            ? <p>Unknown</p>
            : transaction.from.map(({ address, amount, category }: WalletTransactionEndpoint) => (
              <p key={`${transaction.hash}-${address}`}>
                <span
                  children={`[${category < 0 ? 'Foreign Account' : CATEGORY[category]}] `}
                  className='selectableText'
                  style={{ display: 'inline-block', width: '10rem' }}
                />
                <span
                  children={address}
                  className='selectableText'
                  style={{ display: 'inline-block', width: '22rem' }}
                />
                <span style={{ color: 'gray' }}>({amount.toFixed(DECIMALS_LENGTH)})</span>
              </p>
            ))
          }
          <span className='block font-semi-bold mt-4'>Recipient</span>
          {transaction.to.map(({ address, amount, category }: WalletTransactionEndpoint) => (
            <p key={`${transaction.hash}-${address}`}>
              <span
                children={`[${category < 0 ? 'Foreign Account' : CATEGORY[category]}] `}
                className='selectableText'
                style={{ display: 'inline-block', width: '10rem' }}
              />
              <span
                children={address}
                className='selectableText'
                style={{ display: 'inline-block', width: '22rem' }}
              />
              <span style={{ color: 'gray' }}>({amount.toFixed(DECIMALS_LENGTH)})</span>
            </p>
          ))}
        </div>
      </div>
    )
  }

  public render(): JSX.Element {
    return (
      <div className='mt-6' style={{ paddingTop: '10px' }}>
        {this.props.transactions.length === 0 && <p>No transaction.</p>}
        {this.props.transactions.map((transaction: WalletTransaction, index: number) => {
          if (
            R.findIndex<WalletTransactionEndpoint>(R.propEq('category', this.props.category))(transaction.from) !== -1
            && R.findIndex<WalletTransactionEndpoint>(R.propEq('category', this.props.category))(transaction.to) !== -1
          ) {
            return this.renderSent(transaction, index, true)
          }

          return R.findIndex<WalletTransactionEndpoint>(
            R.propEq('category', this.props.category),
          )(transaction.to) === -1
            ? this.renderSent(transaction, index, false)
            : this.renderReceived(transaction, index)
        })}
      </div>
    )
  }
}
