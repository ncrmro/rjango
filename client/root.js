import React from 'react';
import BrowserRouter from 'react-router-dom/es/BrowserRouter';
import { graphql } from 'react-relay';
import routes from './routes';
import RouteWithSubRoutes from './utils/RouteUtil';
import { RelayComponent } from './utils/relay';

const rootQuery = graphql`
    query rootViewerQuery {
        viewer {
            ...App_viewer
            ...Polls_viewer
            ...PollsDetail_viewer
        }
    }
`;

const Root = () => (
  <BrowserRouter>
    <RelayComponent
      ChildComponent={RouteWithSubRoutes}
      routes={routes}
      query={rootQuery}
    />
  </BrowserRouter>
);

export default Root;
