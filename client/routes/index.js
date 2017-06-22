import App from 'components/App/App';
import Landing from 'components/Landing/Landing';
import authRoutes from './auth';
import pollsRoutes from './polls';
import userRoutes from './users';

const routes = [
  {
    component: App,
    childRoutes: [
      {
        path: '/',
        component: Landing,
        queries: 'queries'
      },
      ...authRoutes,
      ...pollsRoutes,
      ...userRoutes
    ]
  }

];

export default routes;
