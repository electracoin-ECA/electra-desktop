import * as React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { bindActionCreators } from 'redux'
// tslint:disable-next-line:no-var-requires
import Toast from './common/toast/toast'
const { connect } = require('react-redux')
import { AddressBook } from './addressBook'
import { ElectraActions } from './electra'
import { Header } from './header'
import { Overview } from './overview'
import { Payments } from './payments'
import { Sidebar } from './sidebar'
import { Transactions } from './transactions'

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
export default class App extends React.Component<any, any> {
  // tslint:disable-next-line:typedef
  componentWillMount() {
    this.props.initializeElectra() // initialize electraJs object
    this.props.startDaemon() // generate HD wallet
    this.props.generateHDWallet()
  }

  // tslint:disable-next-line:typedef
  render() {
    const { badge, message } = this.props.toast

    return (
      <Router>
        <div className='c-app-layout'>
          <div className='c-app-layout__toolbar'>
            <Header />
          </div>
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
        </div>
      </Router>
    )
  }
}
