import dashify from 'dashify'
import Url from 'url-parse'
const localUrlRe = /^\s*[#]?\//

const sanitizeOptions = {
  allowedTags: [
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'p', 'a', 'ul', 'ol',
    'nl', 'li', 'b', 'i', 'strong', 'em', 'strike', 'code', 'hr', 'br', 'div',
    'table', 'thead', 'caption', 'tbody', 'tr', 'th', 'td', 'pre', 'iframe'
  ],
  allowedAttributes: {
    a: ['href', 'name', 'target'],
    // We don't currently allow img itself by default, but this
    // would make sense if we did. You could add srcset here,
    // and if you do the URL is checked for safety
    img: ['src']
  },
  // Lots of these won't come up by default because we don't allow them
  selfClosing: ['img', 'br', 'hr', 'area', 'base', 'basefont', 'input', 'link', 'meta'],
  // URL schemes we permit
  allowedSchemes: ['http', 'https', 'ftp', 'mailto'],
  allowedSchemesByTag: {},
  allowedSchemesAppliedToAttributes: ['href', 'src', 'cite'],
  allowProtocolRelative: true
}

export const calculateModelUrl = (route, model) => {
  const modelName = model || 'index',
    routeName = route.name.replace('.', '/')
  return `/content/${routeName}/${modelName}.json`
}

export const dashifyString = (str) => {
  const dashified = dashify(
    str,
    { condense: true }
  )
  return dashified.replace('.', '-')
}

export const sanitizeUrl = (url) => {
  // @TODO
  return url
}

export const sanitizeHtml = (html) => {
  // @TODO
  return html
}

export const sanitizeAttr = (attr) => {
  // @TODO
  return attr
}

export const parseUrl = (url) => {
  return new Url(url)
}

export const isLocal = (uri) => {
  return uri.match(localUrlRe)
}
