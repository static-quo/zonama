import React from 'react'
import PropTypes from 'prop-types'
import Image from 'react-bootstrap/Image'

import Link from './Link'
import { sanitizeAttr, sanitizeUrl } from '../../util'

export default function ImageLink(props) {
  const {
    src,
    alt,
    uri,
    label,
    target
  } = props

  if (uri) {
    return (
      <Link
        uri={uri}
        label={label || alt}
      >
        <Image
          src={sanitizeUrl(src)}
          alt={sanitizeAttr(alt)}
          role='image'
          aria-label={sanitizeAttr(alt)}
        />
      </Link>
    )
  }
  return (
    <img
      src={sanitizeUrl(src)}
      alt={sanitizeAttr(alt)}
      role='image'
      aria-label={sanitizeAttr(alt)}
    />
  )
}

ImageLink.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  uri: PropTypes.string,
  label: PropTypes.string,
  target: PropTypes.string,
}
