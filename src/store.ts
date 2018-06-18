import * as _ from 'lodash'
import { applyMiddleware, combineReducers, createStore, Middleware } from 'redux'
import logger from 'redux-logger'
import { combineEpics, createEpicMiddleware } from 'redux-observable'

import epics from './epics'
import * as reducers from './reducers'
import { StoreState } from './types'

const epicMiddleware = createEpicMiddleware()
const rootReducer = combineReducers<StoreState>({ ...reducers })
const rootEpic = combineEpics(..._.values(epics))

const middlewares: Middleware[] = []
if (process.env.NODE_ENV !== 'production') middlewares.push(logger)
middlewares.push(epicMiddleware)

export default createStore<StoreState, any, {}, {}>(
  rootReducer,
  applyMiddleware(...middlewares),
)

// https://redux-observable.js.org/MIGRATION.html#setting-up-the-middleware
epicMiddleware.run(rootEpic)
