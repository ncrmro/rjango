import React from 'react';
import BrowserRouter from 'react-router-dom/es/BrowserRouter';
import { graphql, QueryRenderer } from 'react-relay';
import routes from './routes';
import RouteWithSubRoutes from './utils/RouteUtil';
import { RelayComponent } from './utils/relay';

const rootQuery = graphql`
                query rootViewerQuery {
                  viewer {
                      user{email}
                      ...App_viewer
                      ...LandingComponent_viewer
                      }
                }
          `;

const Root = () => (
  <BrowserRouter
    children={
      <RelayComponent
        ChildComponent={RouteWithSubRoutes}
        routes={routes}
        query={rootQuery}
      />
    }
  />
);

export default Root;
