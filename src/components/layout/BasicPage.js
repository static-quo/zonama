import React from 'react'
import PropTypes from 'prop-types'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import Hero from '../widget/Hero'
import ImageLink from '../widget/ImageLink'
import Navbar from '../widget/Navbar'
import Menu from '../widget/Menu'
import RichText from '../widget/RichText'
import { sanitizeHtml } from '../../util'

export default function BasicPage(props) {
  const {
      site,
      model
    } = props,
    utilityMenuId = model.metadata['utility-menu-id'],
    primaryMenuId = model.metadata['primary-menu-id'],
    footerMenuOneId = model.metadata['footer-menu-1-id'],
    footerMenuTwoId = model.metadata['footer-menu-2-id'],
    footerMenuThreeId = model.metadata['footer-menu-3-id'],
    footerMenuFourId = model.metadata['footer-menu-4-id'],
    subFooterMenuId = model.metadata['sub-footer-menu-id']

  return (
    <main role='main' aria-label='Main site container'>
      <header role='region' aria-label='Site header'>
        <Container className='banner' role='banner' fluid>
          <Row>
            <Col sm={12} lg={6} className='branding'>
              <ImageLink
                src={site.metadata.logo}
                alt={site.metadata.title}
                uri='/'
              />
            </Col>
            <Col sm={12} lg={6} className='utility'>
              {
                utilityMenuId &&
                  <Menu site={site} menuId={utilityMenuId} />
              }
            </Col>
          </Row>
        </Container>
        {
          primaryMenuId &&
            <Container
              className='primary-navigation'
              bsPrefix='primary-nav-container'
              fluid
            >
              <Navbar
                site={site}
                menuId={primaryMenuId}
                label={site.metadata.title}
              />
            </Container>
        }
      </header>
      {
        model.hero && (
          <section role='region' aria-label='Hero section'>
            <Hero
              src={model.hero.image}
              alt={model.hero.alt}
              heading={model.hero.heading}
              subHeading={model.hero['sub-heading']}
              intro={model.hero.intro}
              actions={model.hero.actions}
            />
          </section>
        )
      }
      {
        model.body && (
          <section className='content' role='region' aria-label='Primary content'>
            <Container fluid>
              <RichText body={model.body} />
            </Container>
          </section>
        )
      }
      <footer
        className='primary-footer'
        role='contentinfo'
        aria-label='Primary site footer'
      >
        <Container fluid>
          <Row>
            <Col xs={12} md={4}>
              {
                model['footer-copy'] &&
                  <RichText body={model['footer-copy']} />
              }
            </Col>
            <Col xs={6} md={2}>
              {
                footerMenuOneId &&
                  <Menu site={site} menuId={footerMenuOneId} vertical />
              }
            </Col>
            <Col xs={6} md={2}>
              {
                footerMenuTwoId &&
                  <Menu site={site} menuId={footerMenuTwoId} vertical />
              }
            </Col>
            <Col xs={6} md={2}>
              {
                footerMenuThreeId &&
                  <Menu site={site} menuId={footerMenuThreeId} vertical />
              }
            </Col>
            <Col xs={6} md={2}>
              {
                footerMenuFourId &&
                  <Menu site={site} menuId={footerMenuFourId} vertical />
              }
            </Col>
          </Row>
        </Container>
      </footer>
      <footer
        className='secondary-footer'
        role='contentinfo'
        aria-label='Secondary site footer'
      >
        <Container fluid>
          <Row>
            <Col>
              {
                model.copyright &&
                  <span className='copyright'>{sanitizeHtml(model.copyright)}</span>
              }
            </Col>
            <Col>
              {
                subFooterMenuId &&
                  <Menu site={site} menuId={subFooterMenuId} />
              }
            </Col>
          </Row>
        </Container>
      </footer>
    </main>
  )
}

BasicPage.propTypes = {
  site: PropTypes.object.isRequired,
  model: PropTypes.object.isRequired,
}
