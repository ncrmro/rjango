import App from 'components/App/App';
import Landing from 'components/Landing/Landing';
import authRoutes from './auth';
import pollsRoutes from './polls';

export const routes = [
  {
    component: App,

    childRoutes: [
      {
        path: '/',
        component: Landing,
        queries: 'queries'
      },
      ...authRoutes,
      ...pollsRoutes
    ]
  }

];

export default routes