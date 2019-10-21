import React from 'react'
import PropTypes from 'prop-types'

import pluginManager from '../../plugin/PluginManager'

export default function Page(props) {
  const {
      site,
      layout,
      model
    } = props,
    LayoutPlugin = pluginManager.getLayout(layout)
  return <LayoutPlugin site={site} model={model} />
}

Page.propTypes = {
  site: PropTypes.object.isRequired,
  layout: PropTypes.string.isRequired,
  model: PropTypes.object.isRequired,
}
