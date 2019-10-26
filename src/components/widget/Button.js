import React from 'react'
import PropTypes from 'prop-types'
import BSButton from 'react-bootstrap/Button'

import SiteContext from '../SiteContext'
import { sanitizeHtml, sanitizeAttr, sanitizeUrl, isLocal } from '../../util'
import router, { MODES } from '../../route/Router'

export default function Button(props) {
  const {
    label,
    uri,
  } = props
  return (
    <SiteContext.Consumer>
      {(context) => {
        let url = uri
        if (isLocal(url) && router.getMode() === MODES.HASH) {
          url = '#' + url
        }
        return (
          <BSButton
            href={sanitizeUrl(url)}
            role='link'
            aria-label={sanitizeAttr(label)}
            onClick={(evt) => context.onNavigate(evt, url)}
          >
            {sanitizeHtml(label)}
          </BSButton>
        )
      }}
    </SiteContext.Consumer>
  )
}

Button.propTypes = {
  label: PropTypes.string.isRequired,
  uri: PropTypes.string.isRequired,
  ...BSButton.propTypes
}
