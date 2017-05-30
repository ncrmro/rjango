import React from 'react';
import { Route } from 'react-router-dom';

import queryString from 'query-string';

export const cleanNullKeysFromObject = (object) => {
  // Remove null values from object
  Object.keys(object).forEach((key) => (object[key] == null) && delete object[key]);
  return object
};

export const parseUrlParams = (initialVariables) => {
  const parsed = queryString.parse(window.location.search);
  for (var index in parsed) {
    var attr = parsed[index];
    initialVariables[index] = attr
  }

  initialVariables = cleanNullKeysFromObject(initialVariables);

  return initialVariables
};

function RenderRoutes(props) {
  const _subRoutes = (route, router) => {
    if (route.childRoutes) {
      return <route.component
        router={router}
        viewer={props.viewer}
        variables={props.variables}
        setVariables={props.setVariables}
        environment={props.environment}
      >
        {_renderRoutes(route.childRoutes)}
      </route.component>
    }
    else return <route.component
      router={router}
      viewer={props.viewer}
      variables={props.variables}
      setVariables={props.setVariables}
      environment={props.environment}
    />
  };

  const _routeWithSubRoutes = ({ route }) =>
    <div>
      <Route
        exact
        path={route.path}
        render={
        router => _subRoutes(route, router)
      }
      />
    </div>;

  const _renderRoutes = (routes) =>
    <div>
      {routes.map((route, i) => (
        <_routeWithSubRoutes key={i} route={route} />
      ))}
    </div>;
  return _renderRoutes(props.routes)
}

export default RenderRoutes;