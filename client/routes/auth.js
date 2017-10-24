import Auth from 'modules/auth/Auth';
import { authenticatedRoute } from 'modules/auth/utils'

const authRoutes = [
  {
    path: '/signup',
    component: authenticatedRoute(Auth, false),
  },
  {
    path: '/login',
    component: authenticatedRoute(Auth, false),
  }
];


export default authRoutes;
