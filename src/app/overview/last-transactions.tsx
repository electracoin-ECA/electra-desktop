import { capitalize, drop, get } from 'lodash'
import * as moment from 'moment'
import * as React from 'react'
import { Icon } from '../icon'
import { State } from '../transactions/types'
const { connect } = require('react-redux')

const TRANSACTIONS_COUNT: number = 5

// tslint:disable-next-line:typedef
const mapStateToProps = (state: State): State => ({
  transactions: get(state, 'transactions.transactions', [])
})

@connect(mapStateToProps)
export default class LastTransactions extends React.Component<any, any> {
  public render(): any {
    const transactions: any = drop(this.props.transactions, this.props.transactions.length - TRANSACTIONS_COUNT)

    return (
      <div className='mt-6'>
        {transactions.map((transaction: any, index: number) => (
          <div className='c-card mb-4' key={index}>
            <div className='c-card__content flex items-center'>
              <div className='flex-1'>
                <h4>{transaction.address}</h4>
                <span className='text-grey-light'>
                  <Icon name='calendar-alt' />&nbsp;
                  {moment.unix(transaction.time).format('DD-MM-YYYY')}
                </span>
                <span className='text-grey-light ml-4'>
                  <Icon name='clock' />&nbsp;
                  {moment.unix(transaction.time).format('LT')}
                </span>
              </div>
              <div className='flex-none text-right'>
                <span className='block'>{capitalize(transaction.category)}</span>
                <p className='font-extra-bold'>{`${transaction.amount} ECA`}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }
}
