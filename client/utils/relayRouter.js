import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { RelayComponent } from './relay';
import { createFragmentContainer, QueryRenderer, graphql } from 'react-relay';


function relayRoute(props) {
  console.log(props.route);
  let RouteComponment = props.route.indexRoute && !props.route.path ? props.route.component : props.route.indexRoute.component;
  const comp = (compProps) => <RouteComponment {...compProps} {...props}/>;
  console.log(RouteComponment);

  if (props.route.indexRoute) {
    return <props.route.component>
      {RelayComponent({
        ChildComponent: comp,
        query: rootQuery,
        variables: { first: 10 }
      })}
    </props.route.component>
  }
  else {
    return <div>
      {RelayComponent({
        ChildComponent: comp,
        query: rootQuery,
        variables: { first: 10 }
      })}
    </div>
  }
}

function RenderRoutes(props) {
  const _routeWithSubRoutes = ({ route }) =>
    <div>
      <Route exact path={route.path} render={router => (
    <route.component router={router} childRoutes={route.routes} />
  )} />
    </div>;
  const _renderRoutes = (routes) =>
    <div>
      {routes.map((route, i) => (
        <_routeWithSubRoutes key={i} route={route} />
      ))}
    </div>;
  return _renderRoutes(props.routes)
}

export default RenderRoutes