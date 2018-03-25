import * as React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import Toast from './common/toast/toast'
const { connect } = require('react-redux')

import { AddressBook } from './addressBook'
import { ElectraActions } from './electra'
import { Header } from './header'
import Login from './login'
import { Overview } from './overview'
import { Payments } from './payments'
import { Sidebar } from './sidebar'
import { Transactions } from './transactions'

interface ComponentState {
  isLoading: boolean
}

// tslint:disable-next-line:typedef
const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators({
    generateHDWallet: ElectraActions.generateHDWallet,
    initializeElectra: ElectraActions.initializeElectra,
    startDaemon: ElectraActions.startDaemon
    // tslint:disable-next-line:align
  }, dispatch)

// tslint:disable-next-line:typedef
const mapStateToProps = (state: any): any =>
  ({
    toast: state.toast
  })

/**
 * Point of entrance
 */

@connect(mapStateToProps, mapDispatchToProps)
export default class App extends React.Component<any, ComponentState> {
  constructor(props: any) {
    super(props)

    this.state = {
      isLoading: true
    }
  }

  // tslint:disable-next-line:typedef
  public render(): JSX.Element {
    const { badge, message } = this.props.toast

    return (
      <Router>
        <div className='c-app-layout'>
          {this.state.isLoading
            ? (
              <Login onDone={(): void => this.setState({ isLoading: false })} />
            )
            : [
              <div className='c-app-layout__toolbar'>
                <Header />
              </div>,
              <div className='c-app-layout__container'>
                <aside>
                  <Sidebar />
                </aside>
                <main>
                  <Switch>
                    <Route exact path='/' component={Overview} />
                    <Route exact path='/payments' component={Payments} />
                    <Route exact path='/transactions' component={Transactions} />
                    <Route exact path='/address_book' component={AddressBook} />
                  </Switch>
                  <Toast
                    message={message}
                    badge={badge} />
                </main>
              </div>
            ]
          }
        </div>
      </Router>
    )
  }
}
