import React from 'react';
import { Provider } from 'react-redux';
import ReactDom from 'react-dom';
import 'rxjs';

import App from './app/App';
import store from './app/store';

ReactDom.render(
  <Provider store={store}>
    <App/>
  </Provider>
  , document.getElementById('root'));
