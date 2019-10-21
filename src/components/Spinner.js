import React from 'react'
import PropTypes from 'prop-types'

export default function Spinner(props) {
  const {
    error,
    pastDelay,
    retry,
  } = props

  if (error) {
    return (
      <div>Error! <button onClick={retry}>Retry</button></div>
    )
  }
  if (pastDelay === undefined || pastDelay) {
    return (
      <div>Loading...</div>
    )
  }
  return null
}

Spinner.propTypes = {
  error: PropTypes.object,
  pastDelay: PropTypes.bool,
  retry: PropTypes.func.isRequired,
}
