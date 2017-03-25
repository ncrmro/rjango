import AppContainer from '../components/App/AppContainer';
import Landing from '../components/Landing/LandingContainer';
import ViewerQuery from './queries/ViewerQuery';
import UserRoutes from '../apps/users/routes';
import Dashboard from './routes/dashboard';

export default () => ({
  childRoutes: [{
    path: '/',
    component: AppContainer,
    queries: ViewerQuery,
    indexRoute: {
      queries: ViewerQuery,
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
