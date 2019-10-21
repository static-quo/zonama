import ActionTypes from '../action-types'

const initialState = {
  isInitialized: false,
  isLoading: true,
  site: null,
  routes: [],
  currentRoute: null,
  model: null,
  error: null,
  theme: null,
}

export default function(state = initialState, action) {
  if (action.type === ActionTypes.START_INITIALIZE) {
    return {
      ...state,
      isLoading: true,
    }
  } else if (action.type === ActionTypes.END_INITIALIZE) {
    return {
      ...state,
      isInitialized: true,
      site: action.site,
      routes: action.routes,
    }
  } else if (action.type === ActionTypes.START_ROUTE_CHANGE) {
    return {
      ...state
    }
  } else if (action.type === ActionTypes.END_ROUTE_CHANGE) {
    if (action.error) {
      return {
        ...state,
        isLoading: false,
        error: action.error,
      }
    }
    return {
      ...state,
      isLoading: false,
      error: null,
      currentRoute: action.route,
      model: action.model,
    }
  }
  return state
}
