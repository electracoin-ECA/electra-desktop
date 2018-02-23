import { createStore, combineReducers, applyMiddleware } from 'redux'
import { createEpicMiddleware, combineEpics } from 'redux-observable'
import logger from 'redux-logger'
import * as _ from 'lodash'

import * as reducers from './reducers'
import epics from './epics'

const appReducer = combineReducers({ ...reducers })
const appEpics = combineEpics(..._.values(epics))

const epicMiddleWare = createEpicMiddleware(appEpics)

const reduxMiddleWares = []

if (process.env.NODE_ENV !== 'production') {
  reduxMiddleWares.push(logger)
}
reduxMiddleWares.push(epicMiddleWare)

const store = createStore(
  appReducer,
  applyMiddleware(...reduxMiddleWares)
)

export default store
