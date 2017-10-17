import Auth from 'modules/auth/Auth';

const authRoutes = [
  {
    path: '/signup',
    component: Auth,
  },
  {
    path: '/login',
    component: Auth,
  }
];


export default authRoutes;
