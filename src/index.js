import 'react-hot-loader'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import AppContainer from './containers/AppContainer.js'
import store from './redux/store'
import './plugin/PluginManager'
import './plugin/Plugins'
import './styles'

ReactDOM.render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById('root')
)
