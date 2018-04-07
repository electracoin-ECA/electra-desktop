import * as _ from 'lodash'
import { applyMiddleware, combineReducers, createStore, Middleware, Reducer } from 'redux'
import logger from 'redux-logger'
import { combineEpics, createEpicMiddleware, Epic } from 'redux-observable'
import thunk from 'redux-thunk'

import epics from './epics'
import * as reducers from './reducers'
import { StoreState } from './types'

const appReducer: Reducer<StoreState> = combineReducers({ ...reducers })
const appEpics: Epic<any, any, any, any> = combineEpics(..._.values(epics))

const reduxMiddleWares: Middleware[] = []
if (process.env.NODE_ENV !== 'production') {
  reduxMiddleWares.push(logger)
}
reduxMiddleWares.push(createEpicMiddleware(appEpics))
reduxMiddleWares.push(thunk)

export default createStore<StoreState>(
  appReducer,
  applyMiddleware(...reduxMiddleWares),
)
