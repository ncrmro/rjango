import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { RelayComponent } from './relay';
import { createFragmentContainer, QueryRenderer, graphql } from 'react-relay';


function relayRoute(props) {
  console.log(props);
  console.log('routeQuery', props.route.indexRoute.queries);
  const comp = (compProps) => <props.route.indexRoute.component {...compProps} {...props}/>;
  const rootQuery = graphql`
                query relayRouterViewerQuery($first: Int!) {
                  viewer {
                      user{email}
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
  return <props.route.component>
    {RelayComponent({
      ChildComponent: comp,
      query: rootQuery,
      variables: { first: 10 }
    })}
  </props.route.component>
}

function RenderRoutes(props) {
  const _routeWithSubRoutes = ({ route, exact }) =>
    <div>
      <Route
        exact
        path={route.path}
        render={router => {
        const queries = route.indexRoute && route.indexRoute.queries ? route.indexRoute.queries : route.queries;
        if (route.indexRoute && router.match.isExact && !queries) {
          return <route.component>
              <route.indexRoute.component
                router={router}
                route={route}
                environment={props.environment}
              />
            </route.component>
        }
        else if (route.indexRoute && queries && router.match.isExact) {

          return relayRoute({...props, route, router})
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
        <_routeWithSubRoutes key={i} route={route} />
      ))}
    </div>;
  return _renderRoutes(props.routes)
}

export default RenderRoutes