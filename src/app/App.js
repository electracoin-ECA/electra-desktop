import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { ElectraActions } from './electra'
import { Header } from './header'
const Router = BrowserRouter

const mapActionToProps = {
  initializeElectra: ElectraActions.initializeElectra
}

@connect(null, mapActionToProps)
export default class App extends React.Component {
  componentWillMount () {
    this.props.initializeElectra()
  }

  render() {
    return (
      <Router>
        <div class='container'>
          <div class='header'>
            <Header />
          </div>
          <div class='body'>
            <div class='sidebar'></div>
            <div class='main-body'>
              <Switch>
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}
