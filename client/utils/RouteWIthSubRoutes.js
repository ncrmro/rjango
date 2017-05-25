import React from 'react';
import { Route, Switch } from 'react-router-dom';

function RenderRoutes(props) {
  const _routeWithSubRoutes = ({route}) =>
  <div>
    <Route
      path={route.path}
      render={router => (
            <route.component
              router={router}
              route={route}
              environment={props.environment}
              renderSubRoutes={RenderRoutes}
            />
      )}
    />
  </div>;
  const _renderRoutes = () =>
  <div>
    {console.log(props)}
    {props.routes.map((route, i) => (
      <_routeWithSubRoutes key={i} route={route} />
    ))}
  </div>;
  return _renderRoutes()
}

export default RenderRoutes