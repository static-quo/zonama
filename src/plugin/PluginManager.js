export const PLUGIN_TYPES = {
  VIEW: 'VIEW',
  LAYOUT: 'LAYOUT',
  WIDGET: 'WIDGET',
}

class PluginManager {
  constructor() {
    this.plugins = {}
    this.plugins[PLUGIN_TYPES.VIEW] = {}
    this.plugins[PLUGIN_TYPES.LAYOUT] = {}
    this.plugins[PLUGIN_TYPES.WIDGET] = {}
  }

  registerView(name, pluginFunc) {
    this.plugins[PLUGIN_TYPES.VIEW][name] = pluginFunc
    return this
  }

  unregisterView(name) {
    this.plugins[PLUGIN_TYPES.VIEW][name] = null
    delete this.plugins[PLUGIN_TYPES.VIEW][name]
    return this
  }

  getView(name) {
    return this.plugins[PLUGIN_TYPES.VIEW][name] || null
  }

  registerLayout(name, pluginFunc) {
    this.plugins[PLUGIN_TYPES.LAYOUT][name] = pluginFunc
    return this
  }

  unregisterLayout(name) {
    this.plugins[PLUGIN_TYPES.LAYOUT][name] = null
    delete this.plugins[PLUGIN_TYPES.LAYOUT][name]
    return this
  }

  getLayout(name) {
    return this.plugins[PLUGIN_TYPES.LAYOUT][name] || null
  }

  registerWidget(name, pluginFunc) {
    this.plugins[PLUGIN_TYPES.WIDGET][name] = pluginFunc
    return this
  }

  unregisterWidget(name) {
    this.plugins[PLUGIN_TYPES.WIDGET][name] = null
    delete this.plugins[PLUGIN_TYPES.WIDGET][name]
    return this
  }

  getWidget(name) {
    return this.plugins[PLUGIN_TYPES.WIDGET][name] || null
  }
}

const pluginManager = new PluginManager()

export default pluginManager
