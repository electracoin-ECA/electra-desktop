import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Header } from './header'
import  {Sidebar} from './sidebar';
import { OverviewPage } from './overview'

import './styles.scss';

const Router = BrowserRouter;

export default class App extends React.Component<any, any> {
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
								<Route path='/' component={OverviewPage} />
							</Switch>
						</div>
					</div>
				</div>
			</Router>
		);
	}
}
