import 'whatwg-url'

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
          params: params || new URLSearchParams(),
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
      url = new URL(url, window.location.href)
    }

    const path = this._getPathFromUrl(url)
    let params

    if (url.searchParams) {
      params = url.searchParams
    } else if (url.search) {
      params = new URLSearchParams(url.search)
    }

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
    if (!route.params) {
      return route
    }
    return {
      ...route,
      params: null,
    }
  }

  deserialize(state) {
    if (!state.qs) {
      return state
    }
    return {
      ...state,
      params: new URLSearchParams(state.rawParams),
    }
  }
}

const instance = new Router()

export default instance
