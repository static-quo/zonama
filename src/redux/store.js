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

if (module.hot) {
  module.hot.accept('./reducers/app', () => {
    store.replaceReducer(app)
  })
}
export default store
