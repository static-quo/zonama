import React from 'react'
import PropTypes from 'prop-types'
import { hot } from 'react-hot-loader'

function App (props) {
  const {
    message
  } = props
  return (
    <div className='App'>
      <h1>{message}</h1>
    </div>
  )
}

App.propTypes = {
  message: PropTypes.string
}

export default hot(module)(App)
