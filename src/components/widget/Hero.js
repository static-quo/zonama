import React from 'react'
import PropTypes from 'prop-types'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'

import Button from './Button'

import { sanitizeHtml } from '../../util'

export default function Hero(props) {
  const {
    src,
    alt,
    heading,
    subHeading,
    intro,
    actions,
  } = props

  return (
    <Container className='hero' bsPrefix='hero-container'>
      <Row className='no-gutters'>
        <Col>
          <Image src={src} alt={alt || heading} fluid />
          <div className='hero-copy'>
            <h1 role='heading' aria-level='1'>{sanitizeHtml(heading)}</h1>
            {
              subHeading &&
                <h2 role='heading' aria-level='2'>{sanitizeHtml(subHeading)}</h2>
            }
            {
              intro &&
                <p>{sanitizeHtml(intro)}</p>
            }
            {
              actions && (
                <ul role='list' className='actions'>
                  {actions.map((item, idx) => (
                    <li role='listitem' key={`hero-actions-${idx}`}>
                      <Button
                        uri={item.uri}
                        label={item.label}
                      />
                    </li>
                  ))}
                </ul>
              )
            }
          </div>
        </Col>
      </Row>
    </Container>
  )
}

Hero.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  heading: PropTypes.string.isRequired,
  subHeading: PropTypes.string,
  intro: PropTypes.string,
  actions: PropTypes.array,
}
