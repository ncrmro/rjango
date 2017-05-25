import App from '../components/App/App';
import Landing from '../components/Landing/LandingComponent';
import Signup from '../modules/users/Signup/SignupComponent'
import Todos from '../modules/users/Todos/Todos'

export const authRoutes = [
  {
    path: '/signup',
    component: Signup,
  },
  {
    path: '/login',
    component: Signup,
  }
];

export const todoRoutes = [
  {
    path: '/todos',
    component: Todos,
    queries: 'queries'
  }
];

export const routes = [
  { 
    component: App,
    indexRoute: {
      component: Landing,
      queries: 'queries'
    },
    childRoutes: [
      ...authRoutes,
      ...todoRoutes
    ]
  }
];

export default routes