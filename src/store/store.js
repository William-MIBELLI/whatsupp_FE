import { applyMiddleware, legacy_createStore as createStore, compose} from 'redux'
import { rootReducer } from './root-reducer'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

const middlewares = [ thunk, logger ]

const composeEnhancer = compose(applyMiddleware(...middlewares))

export const store = createStore(rootReducer,undefined, composeEnhancer)