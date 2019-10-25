import React from 'react'
import PropTypes from 'prop-types'
import BootstrapNavbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

import NavLink from './NavLink'

import {
  sanitizeHtml,
  sanitizeAttr,
  dashifyString
} from '../../util'

export default function Navbar(props) {
  const {
      site,
      menuId,
      label
    } = props,
    menu = site.metadata.menus[menuId],
    className = 'menu ' + dashifyString(menuId)

  return (
    <BootstrapNavbar expand='lg'>
      {label && <BootstrapNavbar.Brand href='/'>{label}</BootstrapNavbar.Brand>}
      <BootstrapNavbar.Toggle aria-controls={sanitizeAttr(menuId)} />
      <BootstrapNavbar.Collapse id={sanitizeAttr(menuId)}>
        <Nav
          className={className}
          role='navigation'
          aria-label={sanitizeAttr(menu.label)}
          as='ul'
        >
          {menu.items.map((item, idx) => {
            return (
              <Nav.Item
                key={`${menuId}-${idx}`}
                as='li'
              >
                <NavLink
                  uri={item.uri}
                  label={item.label}
                >
                  {sanitizeHtml(item.label)}
                </NavLink>
              </Nav.Item>
            )
          })}
        </Nav>
      </BootstrapNavbar.Collapse>
    </BootstrapNavbar>
  )
}

Navbar.propTypes = {
  site: PropTypes.object.isRequired,
  menuId: PropTypes.string.isRequired,
  label: PropTypes.string,
}
