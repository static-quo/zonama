import React from 'react'
import PropTypes from 'prop-types'
import { hot } from 'react-hot-loader'

function App (props) {
  const {
    message,
    onInputChange,
    onSubmit,
  } = props
  return (
    <div className='App'>
      <h1>{message}</h1>
      <label htmlFor='message-input'>Message:</label><br />
      <input
        type='text'
        name='message-input'
        onChange={(e) => onInputChange(e, 'message-input')}
      /><br />
      <button type='button' onClick={onSubmit}>Update</button>
    </div>
  )
}

App.propTypes = {
  message: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

export default hot(module)(App)
