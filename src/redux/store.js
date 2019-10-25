import thunkMiddleware from 'redux-thunk'
import {
  createStore,
  applyMiddleware
} from 'redux'
import app from './reducers/app'

const store = createStore(
  app,
  applyMiddleware(
    thunkMiddleware
  )
)

export default store
