import { ipcRenderer } from 'electron'
import * as React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import 'rxjs'

import { AddressBook } from './addressBook'
import Toast from './common/toast/toast'
import { Header } from './header'
import Login from './login'
import LoadingSpinner from './login/loading-spinner'
import { Overview } from './overview'
import { Payments } from './payments'
import { Sidebar } from './sidebar'
import { Transactions } from './transactions'

interface ComponentState {
  isLoading: boolean
  isQuitting: boolean
}

// tslint:disable-next-line:typedef
const mapStateToProps = (state: any): any => ({
  toast: state.toast
})

class App extends React.Component<any, ComponentState> {
  constructor(props: any) {
    super(props)

    this.state = {
      isLoading: true,
      isQuitting: false,
    }
  }

  public componentDidMount(): void {
    ipcRenderer.on('app:quit', () => this.setState({ isQuitting: true }))
    ipcRenderer.send('app:quit:listen')
  }

  public render(): JSX.Element {
    const { badge, message } = this.props.toast

    return (
      <Router>
        <div className='c-app-layout'>
          {this.state.isQuitting && <LoadingSpinner text={'Closing daemon...'} />}

          {!this.state.isQuitting && this.state.isLoading && (
            <Login onDone={(): void => this.setState({ isLoading: false })} />
          )}

          {!this.state.isQuitting && !this.state.isLoading && [
            <div key='toolbar' className='c-app-layout__toolbar'>
              <Header />
            </div>,
            <div key='container' className='c-app-layout__container'>
              <aside>
                <Sidebar />
              </aside>
              <main>
                {/* TODO Fix this dirty hack to handle missing redirect on production app. */}
                {process.env.NODE_ENV === 'production' && <Redirect to='/' />}
                <Switch>
                  <Route exact path='/' component={Overview} />
                  <Route exact path='/payments' component={Payments} />
                  <Route exact path='/transactions' component={Transactions} />
                  <Route exact path='/address_book' component={AddressBook} />
                </Switch>
                <Toast
                  message={message}
                  badge={badge}
                />
              </main>
            </div>
          ]}
        </div>
      </Router>
    )
  }
}

export default connect<null, null, {}>(mapStateToProps, null)(App)
