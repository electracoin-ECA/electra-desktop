import * as _ from 'lodash'
import { applyMiddleware, combineReducers, createStore, Store } from 'redux'
import logger from 'redux-logger'
import { combineEpics, createEpicMiddleware } from 'redux-observable'
import thunk from 'redux-thunk'
import epics from './epics'
import * as reducers from './reducers'

const appReducer: any = combineReducers({ ...reducers })
const appEpics: any = combineEpics(..._.values(epics))

const epicMiddleWare: any = createEpicMiddleware(appEpics)

const reduxMiddleWares: any = []

if (process.env.NODE_ENV !== 'production') {
  reduxMiddleWares.push(logger)
}
reduxMiddleWares.push(epicMiddleWare)
reduxMiddleWares.push(thunk)

const store: Store<any> = createStore(
  appReducer,
  applyMiddleware(...reduxMiddleWares)
)

export default store
