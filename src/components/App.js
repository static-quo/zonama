import { hot } from 'react-hot-loader'
import React from 'react'
import PropTypes from 'prop-types'
import SplashScreen from './SplashScreen'
import View from './View'
import SiteContext from './SiteContext'
import { dashifyString } from '../util'

function App(props) {
  const {
      isInitialized,
      isLoading,
      site,
      currentRoute,
      model,
      error,
      onInitialize,
      onNavigate,
    } = props,
    className = 'application ' + (
      currentRoute ? dashifyString(currentRoute.name) : ''
    )
  if (!isInitialized) {
    onInitialize()
    return null
  }
  return (
    <SiteContext.Provider value={{
      site: site,
      route: currentRoute,
      onNavigate: onNavigate
    }}
    >
      <div className={className}>
        {
          isLoading ? (
            <SplashScreen />
          ) : (
            <View site={site} route={currentRoute} model={model} />
          )
        }
      </div>
    </SiteContext.Provider>
  )
}

App.propTypes = {
  isInitialized: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  site: PropTypes.object,
  currentRoute: PropTypes.object,
  model: PropTypes.object,
  error: PropTypes.object,
  onInitialize: PropTypes.func.isRequired,
  onNavigate: PropTypes.func.isRequired,
}

export default hot(module)(App)
