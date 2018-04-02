import { WalletTransaction } from 'electra-js'
import { capitalize, isEmpty } from 'lodash'
import * as moment from 'moment'
import * as React from 'react'
import { Icon } from '../../libraries/icon'

const CONFIRMATIONS_NEEDED: number = 10
const NO_CONFIRMATIONS: number = 0
const QUARTER: number = 25
const HALF: number = 50
const THREE_QUARTERS: number = 75
const COMPLETED: number = 100

interface State {
  expanded?: boolean[],
  transactions: WalletTransaction[]
}

export default class TransactionsComponent extends React.Component<State, any> {
  constructor(props: State) {
    super(props)

    this.state = { expanded: [] }
  }

  toggleExpand(index: number): void {
    this.state.expanded[index] = !this.state.expanded[index]
    this.setState({ expanded: this.state.expanded })
  }

  getDataProgress(confirmations: number): string {
    const percentage: number = (confirmations * COMPLETED) / CONFIRMATIONS_NEEDED

    if (percentage >= NO_CONFIRMATIONS && percentage < QUARTER) return String(NO_CONFIRMATIONS)
    if (percentage >= QUARTER && percentage < HALF) return String(QUARTER)
    if (percentage >= HALF && percentage < THREE_QUARTERS) return String(HALF)
    if (percentage >= THREE_QUARTERS && percentage < COMPLETED) return String(THREE_QUARTERS)

    return String(COMPLETED)
  }

  public render(): any {
    const transactions: WalletTransaction[] = this.props.transactions
    const { expanded } = this.state

    return (
      <div className='mt-6 '>
        {transactions.map((transaction: WalletTransaction, index: number) => (
          <div
            className={`c-card  mb-4 ${expanded[index] ? 'expanded' : ''}`} key={index}>
            <div
              className='c-card__content items-center pr-16'
              onClick={this.toggleExpand.bind(this, index)}
            >
              <div className='block lg:inline-block mb-4 lg:mr-8 lg:mb-0'>
                <span className='block'>{capitalize(transaction.type)}</span>
                <p className='font-extra-bold'>{`${transaction.amount} ECA`}</p>
              </div>
              <div className='block lg:inline-block mb-4 lg:mr-8 lg:mb-0'>
                <span className='block'>{transaction.type === 'SENT' ? 'From' : 'To'}</span>
                <p className='font-extra-bold'>{transaction.type === 'SENT' ? transaction.from : transaction.to}</p>
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
                  <Icon name='caret-down' />
                </svg>
              </div>
            </div>
            <div className='c-card__expandable'>
              <span className='block font-semi-bold'>Confirmations</span>
              <p>{transaction.confimationsCount}</p>
              <span className='block font-semi-bold mt-4'>Transaction ID</span>
              <p>{transaction.hash}</p>
              <span className='block font-semi-bold mt-4'>Sender</span>
              <p>{isEmpty(transaction.from) ? 'Unknown' : transaction.from}</p>
              <span className='block font-semi-bold mt-4'>Recipient</span>
              <p>{isEmpty(transaction.to) ? 'Unknown' : transaction.to}</p>
            </div>
          </div>
        ))}
      </div>
    )
  }
}
