import Signup from '../modules/users/Signup';
import Login from '../modules/users/Login';

const authRoutes = [
  {
    path: '/signup',
    component: Signup,
  },
  {
    path: '/login',
    component: Login,
  }
];


export default authRoutes;
