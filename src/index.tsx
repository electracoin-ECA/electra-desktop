import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import App from './App'
import injectContextMenu from './helpers/injectContextMenu'
import store from './store'

import './styles.scss'

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root'),
)

injectContextMenu()
