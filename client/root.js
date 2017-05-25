import React from 'react';
import BrowserRouter from 'react-router-dom/es/BrowserRouter';
import { QueryRenderer, graphql } from 'react-relay';
import routes from './routes';
import RouteWithSubRoutes from './utils/relayRouter';
import { environment } from './utils/relay';


const Root = () => (
  <BrowserRouter
    children={<RouteWithSubRoutes routes={routes} environment={environment} />}
  />
);

export default Root;
