import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './app/App'
import store from './app/store'
import './app/styles.scss'

ReactDOM.render(
  <MuiThemeProvider>
  <Provider store={store}>
    <App/>
  </Provider>
  </MuiThemeProvider>,
  document.getElementById('root')
)
