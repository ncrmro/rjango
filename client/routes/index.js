import App from 'components/App/App';
import Landing from 'components/Landing/Landing';
import authRoutes from './auth'
import pollsRoutes from './polls'

export const routes = [
  { 
    component: App,
    indexRoute: {
      component: Landing,
      queries: 'queries'
    },
    childRoutes: [
      ...authRoutes,
      ...pollsRoutes
    ]
  }
];

export default routes