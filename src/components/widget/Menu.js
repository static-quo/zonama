import React from 'react'
import PropTypes from 'prop-types'
import Nav from 'react-bootstrap/Nav'

import NavLink from './NavLink'

import {
  sanitizeHtml,
  sanitizeAttr,
  dashifyString
} from '../../util'

export default function Menu(props) {
  const {
      site,
      menuId,
      vertical,
    } = props,
    menu = site.metadata.menus[menuId],
    className = 'menu ' + dashifyString(menuId)

  return (
    <nav
      className={className}
      role='navigation'
      aria-label={sanitizeAttr(menu.label)}
    >
      <Nav
        className={vertical ? 'flex-column' : ''}
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
    </nav>
  )
}

Menu.propTypes = {
  site: PropTypes.object.isRequired,
  menuId: PropTypes.string.isRequired,
  vertical: PropTypes.bool,
}
