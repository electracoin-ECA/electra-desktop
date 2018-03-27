import * as React from 'react'
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import TransactionsComponent from '../common/transactions/transactions'
import { getTransactions } from '../transactions/actions'
import { DispatchProps, StateProps } from './types'

const mapStateToProps: MapStateToProps<StateProps,{}, {}> = (state: StateProps): StateProps => ({
  transactions: state.transactions
})

const mapDispatchToProps: MapDispatchToProps<DispatchProps, {}> =
(dispatch: Dispatch<StateProps>): DispatchProps =>
  bindActionCreators({
    getTransactions},dispatch)

class Transactions extends React.Component<StateProps & DispatchProps, any> {
  componentDidMount(): void {
    this.props.getTransactions()
  }

  render(): any {
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

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(Transactions)
