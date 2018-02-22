import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Header } from './header';
const Router = BrowserRouter;

export default class App extends React.Component {
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
