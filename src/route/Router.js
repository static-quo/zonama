import {
  parseUrl
} from '../util'

export const MODES = {
  HASH: 0,
  PATH: 1
}

class Router {
  constructor() {
    this.routes = {}
    this.mode = MODES.HASH
  }

  setMode(mode) {
    this.mode = mode
  }

  getMode(mode) {
    return this.mode
  }

  routesChanged(routes) {
    return new Promise((resolve, reject) => {
      this.routes = routes
      resolve(this)
    })
  }

  getRoute(name, locale, params) {
    return (
      this.routes[name]
        ? {
          ...this.routes[name],
          name: name,
          locale: locale,
          params: params,
          rawParams: params ? params.toString() : '',
        }
        : null
    )
  }

  _getPathFromUrl(url) {
    if (this.mode === MODES.PATH) {
      return url.pathname
    }

    const hash = url.hash

    if (!hash || hash.length <= 1) {
      return null
    }

    return hash.substring(1)
  }

  getRouteByUrl(url, site) {
    if (typeof url === 'string') {
      url = parseUrl(url)
    }

    const path = this._getPathFromUrl(url),
      params = url.query

    if (!path || path === '/') {
      return this.getRoute('home')
    }

    const segments = path.substring(1).split('/'),
      prefix = segments[0],
      languages = site.languages,
      locale = site.locale || 'en-us'

    if (
      !languages ||
      !languages[locale] ||
      prefix === locale
    ) {
      return this.getRoute(
        segments.join('.'),
        locale,
        params
      )
    }

    return this.getRoute(
      segments.slice(1).join('.'),
      locale,
      params
    )
  }

  serialize(route) {
    return route
  }

  deserialize(state) {
    return state
  }
}

const instance = new Router()

export default instance
