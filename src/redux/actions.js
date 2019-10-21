import ActionTypes from './action-types'
import 'whatwg-fetch'
import router from '../route/Router'
import cache from '../cache/Cache'
import {
  calculateModelUrl
} from '../util'

export const startInitializing = () => {
  return {
    type: ActionTypes.START_INITIALIZE,
  }
}

export const endInitializing = (err, metadata, routes) => {
  return {
    type: ActionTypes.END_INITIALIZE,
    error: err,
    site: metadata,
    routes: routes,
  }
}

export const startRouteChange = () => {
  return {
    type: ActionTypes.START_ROUTE_CHANGE,
  }
}

export const endRouteChange = (err, route, model) => {
  return {
    type: ActionTypes.END_ROUTE_CHANGE,
    error: err,
    route: route,
    model: model,
  }
}

const _popState = (evt, dispatch) => {
  if (evt.state && evt.state.route) {
    dispatch(startRouteChange())
    _finishRouteChange(
      dispatch,
      new URL(evt.state.uri, window.document.href),
      router.deserialize(evt.state.route),
      false
    )
  }
}

const _pushState = (uri, route) => {
  window.history.pushState(
    {
      route: router.serialize(route),
      uri: uri.toString(),
    },
    '',
    uri
  )
}

const _finishRouteChange = (dispatch, uri, route, push = true) => {
  const modelUrl = calculateModelUrl(route),
    model = cache.get(modelUrl)

  if (model !== null) {
    console.debug('using cached model')
    if (push) {
      _pushState(uri, route)
    }
    dispatch(endRouteChange(null, route, model))
    return
  }

  window.fetch(modelUrl)
    .then(response => {
      return response.json()
    })
    .then(json => {
      cache.put(modelUrl, json)
      if (push) {
        _pushState(uri, route)
      }
      dispatch(endRouteChange(null, route, json))
    })
    .catch(err => {
      console.log(err)
      dispatch(endRouteChange(err, route, null))
    })
}

export const initialize = () => {
  let routes
  return (dispatch, getState) => {
    dispatch(startInitializing())
    window.fetch('/config/routes.json')
      .then(response => {
        return response.json()
      })
      .then(json => {
        routes = json
        console.debug(routes.routes)
        return router.routesChanged(routes.routes)
      })
      .then(router => {
        return window.fetch('/content/site.json')
      })
      .then(response => {
        return response.json()
      })
      .then(json => {
        dispatch(endInitializing(null, json, routes.routes))
        window.onpopstate = (evt) => _popState(evt, dispatch)
        dispatch(loadRouteByUrl(
          window.location || '/'
        ))
      })
      .catch(err => {
        console.log(err)
        dispatch(endInitializing(err, null))
      })
  }
}

export const loadRouteByUrl = (uri) => {
  return (dispatch, getState) => {
    const site = getState().site,
      route = router.getRouteByUrl(uri, site)
    console.debug(route)

    dispatch(startRouteChange())
    if (!route) {
      dispatch(endRouteChange(
        new Error(`No route found for URL ${uri}`)
      ))
      return
    }

    _finishRouteChange(dispatch, uri, route)
  }
}
