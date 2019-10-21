import pluginManager from './PluginManager'
import Page from '../components/view/Page'
import BasicPage from '../components/layout/BasicPage'
import RichText from '../components/widget/RichText'

pluginManager
  .registerView('Page', Page)
  .registerLayout('BasicPage', BasicPage)
  .registerWidget('RichTextWidget', RichText)
