import * as React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ElectraActions } from './electra';
import './styles.scss';
import { Header } from './header'
import  {Sidebar} from './sidebar';
import { OverviewPage } from './overview'
const Router = BrowserRouter;

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <div className='container'>
          <div className='header'>
            Hey
          </div>
          <div className='body'>
            <div className='sidebar'>
              <Sidebar />
            </div>
            <div className='main-body'>
              <Switch>
                <Route path='/' component={OverviewPage} />
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}
