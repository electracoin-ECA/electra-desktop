import { WalletTransaction } from 'electra-js'
import { capitalize } from 'lodash'
import * as moment from 'moment'
import * as React from 'react'
import { Icon } from '../../icon'

export default class TransactionsComponent extends React.Component<any, any> {
  public render(): any {
    const transactions : WalletTransaction[] = this.props.transactions

    return (
      <div className='mt-6 '>
        {transactions.map((transaction: WalletTransaction, index: number) => (
          <div className='c-card mb-4' key={index}>
            <div className='c-card__content flex items-center'>
              <div className='flex-1'>
                <h4>{transaction.from}</h4>
                <h4>{transaction.to}</h4>
                <span className='text-grey-light'>
                  <Icon name='calendar-alt' />&nbsp;
                  {moment.unix(transaction.date).format('DD-MM-YYYY')}
                </span>
                <span className='text-grey-light ml-4'>
                  <Icon name='clock' />&nbsp;
                  {moment.unix(transaction.date).format('LT')}
                </span>
                <br/>
                <span className='text-grey-light ml-4'>
                  Confirmation(s): {transaction.confimationsCount}
                </span>
              </div>
              <div className='flex-none text-right'>
                <span className='block'>{capitalize(transaction.type)}</span>
                <p className='font-extra-bold'>{`${transaction.amount} ECA`}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }
}
