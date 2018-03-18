import * as React from 'react'
const { connect } = require('react-redux')
import { bindActionCreators, Dispatch } from 'redux'
import TransactionsComponent from '../common/transactions'
import { getTransactions } from '../transactions/actions'
import { DispatchProps, State, State as Props } from './types'

// tslint:disable-next-line:typedef
const mapStateToProps = (state: State): Props =>
  ({
    transactions: state.transactions
  })

// tslint:disable-next-line:typedef
const mapDispatchToProps = (dispatch: Dispatch<State>): DispatchProps =>
  bindActionCreators({
    getTransactions
    // tslint:disable-next-line:align
  }, dispatch)

@connect(mapStateToProps, mapDispatchToProps)
export default class Transactions extends React.Component<Props & DispatchProps, any> {
  // tslint:disable-next-line:typedef
  public componentDidMount() {
    this.props.getTransactions()
  }

  public render(): any {
    const transactions: any = this.props.transactions.transactions || []

    return (
      <div className='c-view'>
        <div className='c-view__header'>
          <h2>Transactions</h2>
        </div>
        <div className='c-view__content'>
            <TransactionsComponent transactions={transactions}/>
        </div>
    </div>
    )
  }
}
