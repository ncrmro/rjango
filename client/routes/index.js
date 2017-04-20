import AppContainer from '../components/App/AppContainer';
import Landing from '../components/Landing/LandingComponent';
import ViewerQuery from '../queries/ViewerQuery';
import UserRoutes from './users';
import Dashboard from './dashboard';

export default () => ({
  childRoutes: [{
    path: '/',
    component: AppContainer,
    queries: ViewerQuery,
    indexRoute: {
      component: Landing
    },
    childRoutes: [
      UserRoutes,
      Dashboard,
      {
        path: '*',
        component: Landing
      }
    ]
  }]
});
