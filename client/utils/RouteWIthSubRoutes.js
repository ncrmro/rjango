import React from 'react';
import { Route, Switch } from 'react-router-dom';
import {RelayComponent} from './relay'


function RenderRoutes(props) {
  const _routeWithSubRoutes = ({ route, exact }) =>
    <div>
      <Route
        exact
        path={route.path}
        render={router => {
        if (route.indexRoute && router.match.isExact) {
          return <route.component>
              <route.indexRoute.component
                router={router}
                route={route}
                environment={props.environment}
              />
            </route.component>
        }
        else if (route.childRoutes) {
          return <route.component >
              {_renderRoutes(route.childRoutes)}
            </route.component>
        }
        else {
          return <route.component />
        }
      }}
      />
    </div>;
  const _renderRoutes = (routes) =>
    <div>
      {routes.map((route, i) => (
        <_routeWithSubRoutes key={i} route={route}  />
      ))}
    </div>;
  return _renderRoutes(props.routes)
}

export default RenderRoutes