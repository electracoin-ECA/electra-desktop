import * as _ from 'lodash'
import { Action, applyMiddleware, combineReducers, createStore, Middleware, Reducer } from 'redux'
import logger from 'redux-logger'
import { combineEpics, createEpicMiddleware, EpicMiddleware } from 'redux-observable'

import epics from './epics'
import * as reducers from './reducers'
import { StoreState } from './types'

const epicMiddleware: EpicMiddleware<Action<any>, Action<any>, void, any> = createEpicMiddleware()
const rootReducer: Reducer<StoreState> = combineReducers({ ...reducers })
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
