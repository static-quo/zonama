import React from 'react'
import PropTypes from 'prop-types'

import SiteContext from '../SiteContext'
import { sanitizeAttr, sanitizeUrl, isLocal } from '../../util'
import router, { MODES } from '../../route/Router'

export default function Link(props) {
  const {
    uri,
    label,
    target
  } = props
  return (
    <SiteContext.Consumer>
      {(context) => {
        let url = uri
        if (isLocal(uri) && router.getMode() === MODES.HASH) {
          url = '#' + url
        }
        return (
          <a
            href={sanitizeUrl(url)}
            title={sanitizeAttr(label)}
            target={sanitizeAttr(target)}
            role='link'
            aria-label={sanitizeAttr(label)}
            onClick={(e) => context.onNavigate(e, url)}
          >
            {props.children}
          </a>
        )
      }}
    </SiteContext.Consumer>
  )
}

Link.propTypes = {
  children: PropTypes.node.isRequired,
  uri: PropTypes.string.isRequired,
  label: PropTypes.string,
  target: PropTypes.string,
}
