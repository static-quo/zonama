import React from 'react'
import PropTypes from 'prop-types'

import { sanitizeHtml } from '../../util'

export default function RichTextWidget(props) {
  const {
      body
    } = props,
    html = { __html: sanitizeHtml(body) }

  return (
    <div className='body' dangerouslySetInnerHTML={html} />
  )
}

RichTextWidget.propTypes = {
  body: PropTypes.string.isRequired,
}
