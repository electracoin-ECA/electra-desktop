import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
const { connect } = require('react-redux')
import { ElectraActions } from './electra'
import { Header } from './header'
import { Sidebar } from './sidebar';
import { Overview } from './overview'

import './styles.scss';
const Router = BrowserRouter;

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
        <div className='container'>
          <div className='header'>
            <Header />
          </div>
          <div className='body'>
            <div className='sidebar'>
              <Sidebar />
            </div>
            <div className='main-body'>
              <Switch>
                <Route path='/' component={Overview} />
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}
