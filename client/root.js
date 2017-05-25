import React from 'react';
import BrowserRouter from 'react-router-dom/es/BrowserRouter';
import { QueryRenderer, graphql } from 'react-relay';
import routes from './routes';
import RouteWithSubRoutes from './utils/relayRouter';
import { environment } from './utils/relay';
import { RelayComponent } from './utils/relay';

const rootQuery = graphql`
                query rootViewerQuery($first: Int!) {
                  viewer {
                      user{email}
                      ...App_viewer
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

const Root = () => (
  <BrowserRouter
    children={<RelayComponent {...{
        ChildComponent: () => <RouteWithSubRoutes routes={routes} />,
        query: rootQuery,
        variables: { first: 10 }
      }}/>}
  />
);

export default Root;
