import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import App from './app/app'
import store from './app/store'
import injectContextMenu from './helpers/injectContextMenu'

import './app/styles.scss'

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root'),
)

injectContextMenu()
