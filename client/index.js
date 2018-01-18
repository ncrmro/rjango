import { AppRegistry } from 'react-native';
import Reango from './root';

const appName = 'Reango'

function render(App) {
  AppRegistry.registerComponent(appName, () => App)
  AppRegistry.runApplication(appName, {
    rootTag: document.getElementById('root')
  })
}

render(Reango)

if (module.hot) {
  module.hot.accept('./root', () => {
    const NextApp = require('./root').default // eslint-disable-line global-require
    render(NextApp)
  })
}

