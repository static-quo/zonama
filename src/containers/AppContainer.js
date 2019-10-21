import { connect } from 'react-redux'

import App from '../components/App'
import {
  initialize,
  loadRouteByUrl,
} from '../redux/actions'
import { isLocal } from '../util'

const mapStateToProps = state => {
  return {
    isInitialized: state.isInitialized,
    isLoading: state.isLoading,
    site: state.site,
    currentRoute: state.currentRoute,
    model: state.model,
    error: state.error,
  }
}

const mapStateToDispatch = dispatch => {
  return {
    onInitialize: () => {
      dispatch(initialize())
    },
    onNavigate: (evt, uri) => {
      const url = uri
      if (isLocal(url)) {
        evt.preventDefault()
        dispatch(loadRouteByUrl(url))
      }
    }
  }
}

export default connect(
  mapStateToProps,
  mapStateToDispatch
)(App)
