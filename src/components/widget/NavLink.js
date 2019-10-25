import React from 'react'
import PropTypes from 'prop-types'
import Nav from 'react-bootstrap/Nav'

import SiteContext from '../SiteContext'
import { sanitizeAttr, sanitizeUrl, isLocal } from '../../util'
import router, { MODES } from '../../route/Router'

export default function NavLink(props) {
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
          <Nav.Link
            href={sanitizeUrl(url)}
            role='link'
            aria-label={sanitizeAttr(label)}
            onSelect={(key, evt) => context.onNavigate(evt, url)}
          >
            {label}
          </Nav.Link>
        )
      }}
    </SiteContext.Consumer>
  )
}

NavLink.propTypes = {
  uri: PropTypes.string.isRequired,
  label: PropTypes.string,
  target: PropTypes.string,
}
