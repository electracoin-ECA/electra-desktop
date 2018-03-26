import * as React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Toast from './common/toast/toast'
const { connect } = require('react-redux')
import * as express from 'express'
import 'rxjs'
// const { ipcRenderer } = require('electron')
import store from './store'

import { AddressBook } from './addressBook'
import { Header } from './header'
import Login from './login'
import { Overview } from './overview'
import { Payments } from './payments'
import { Sidebar } from './sidebar'
import { Transactions } from './transactions'
import { getTransaction } from './transactions/actions';

interface ComponentState {
  isLoading: boolean
}

// tslint:disable-next-line:typedef
const mapStateToProps = (state: any): any => ({
  toast: state.toast
})

/**
 * Run express server to catch incoming post request and notify the user
 */
const EXPRESS_PORT: number = 3005
const expressApp: express.Express = express()
expressApp.post('/transaction/txid=*', (req: any, res: any) => {
  // if (mainWindow) {
  //   mainWindow.webContents.send('newTransaction', { msg: req.params[0] })
  // }
  store.dispatch(getTransaction(req.params[0]))
  res.send('OK')
})
expressApp.listen(EXPRESS_PORT)

/**
 * Point of entrance
 */

// ipcRenderer.on('newTransaction', function (event: any, data: any): void {
//   store.dispatch(getTransaction(data.msg))
// })

@connect(mapStateToProps)
export default class App extends React.Component<any, ComponentState> {
  constructor(props: any) {
    super(props)

    this.state = {
      isLoading: true
    }
  }

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
