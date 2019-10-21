import React from 'react'
import PropTypes from 'prop-types'
import pluginManager from '../plugin/PluginManager'
import { dashifyString } from '../util'

export default function View(props) {
  const {
      site,
      route,
      model,
    } = props,
    view = route.view,
    layout = route.layout,
    Plugin = pluginManager.getView(view),
    className = 'view ' + dashifyString(view) + ' ' + dashifyString(layout)

  return (
    <div className={className}>
      <Plugin site={site} layout={layout} model={model} />
    </div>
  )
}

View.propTypes = {
  site: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
  model: PropTypes.object.isRequired,
}
