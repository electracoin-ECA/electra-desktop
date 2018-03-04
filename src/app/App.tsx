import * as React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
const { connect } = require('react-redux')
import { ElectraActions } from './electra'
import { Header } from './header'
import { Sidebar } from './sidebar'
import { Overview } from './overview'

const Router = BrowserRouter

const mapActionToProps = {
  initializeElectra: ElectraActions.initializeElectra,
  generateHDWallet: ElectraActions.generateHDWallet
}

@connect(null, mapActionToProps)
export default class App extends React.Component<any, any> {
  componentWillMount() {
    this.props.initializeElectra() // initialize electraJs object
    this.props.generateHDWallet() // generate HD wallet
  }

  render() {
    return (
      <Router>
        <div className="c-app-layout">
          <div className="c-app-layout__toolbar">
            <Header />
          </div>
          <div className="c-app-layout__container">
              <aside>
                <Sidebar />
              </aside>
              <main>
                <Switch>
                  <Route path='/' component={Overview} />
                </Switch>
              </main>
          </div>
        </div>
      </Router>
    )
  }
}
