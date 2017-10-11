import React from 'react'
import BrowserRouter from 'react-router-dom/es/BrowserRouter'
import App from 'components/App/App'
import routes from './routes'
import RouteWithSubRoutes from './utils/RouteUtil'
import createBrowserHistory from 'history/es/createBrowserHistory'
import { environment } from 'utils/relay'
import { isAuthenticated } from 'modules/auth/utils'
//require('offline-plugin/runtime').install()

const history = createBrowserHistory()

const Root = (props) =>
  <BrowserRouter history={history} >
    <App {...props}>
      <RouteWithSubRoutes
        {...props}
        routes={routes}
        relay={{ environment }}
      />
    </App>
  </BrowserRouter>

export default isAuthenticated(Root)
