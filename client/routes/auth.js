import Auth from '../modules/users/Auth';

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
