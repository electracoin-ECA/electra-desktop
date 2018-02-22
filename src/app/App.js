import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Header } from './Header'
const Router = BrowserRouter;

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <Header />
      </Router>
    );
  }
}
