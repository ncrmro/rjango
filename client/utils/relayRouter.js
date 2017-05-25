import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { RelayComponent } from './relay';
import { createFragmentContainer, QueryRenderer, graphql } from 'react-relay';


function relayRoute(props) {
  console.log(props.route);
  let RouteComponment = props.route.indexRoute ? props.route.indexRoute.component : props.route.component;
  const comp = (compProps) => <RouteComponment {...compProps} {...props}/>;
  const rootQuery = graphql`
                query relayRouterViewerQuery($first: Int!) {
                  viewer {
                      user{email}
                      ...LandingComponent_viewer
                      ...Todos_viewer
                      todos(first: $first) {
                        edges{
                            node {
                                id
                            }
                        }
                      }
                  }
                }
          `;
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
  const _routeWithSubRoutes = ({ route, exact }) =>
    <div>
      <Route
        exact
        path={route.path}
        render={router => {
        const queries = route.indexRoute && route.indexRoute.queries ? route.indexRoute.queries : route.queries;
        const isIndexRoute = route.indexRoute && router.match.isExact && !queries;
        const isRelayRoute = route.component && queries && router.match.isExact;
        const routeHasChildRoutes = route.childRoutes;
        if (isIndexRoute) {
          return <route.component>
              <route.indexRoute.component
                router={router}
                route={route}
                environment={props.environment}
              />
            </route.component>
        }
        else if (isRelayRoute) {
          return relayRoute({...props, route, router})
        }
        else if (routeHasChildRoutes) {
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
        <_routeWithSubRoutes key={i} route={route} />
      ))}
    </div>;
  return _renderRoutes(props.routes)
}

export default RenderRoutes