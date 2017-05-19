import React from 'react';
import BrowserRouter from 'react-router-dom/es/BrowserRouter';
import { QueryRenderer, graphql } from 'react-relay';
import { Route } from 'react-router-dom';
//import App from './components/App/App';
import routes from './routes';
import { environment } from './relay';


const RouteWithSubRoutes = ({ route }) =>
  <div>
    <Route exact path={route.path} render={router => (
    <route.component router={router} childRoutes={route.routes} environment={environment} />
  )} />
  </div>;

const Routes = () =>
  <div>
    {routes.map((route, i) => (
      <RouteWithSubRoutes key={i} route={route} />
    ))}
  </div>;

const Root = () => (
  <BrowserRouter children={<Routes/>} />
);

export default Root;
