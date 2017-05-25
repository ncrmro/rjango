import App from '../components/App/App';
import Landing from '../components/Landing/LandingComponent';
import Signup from '../modules/users/Signup/SignupComponent'
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

export const routes = [
  { 
    component: App,
    indexRoute: {
      component: Landing,
      queries: 'queries'
    },
    childRoutes: [
      ...authRoutes
    ]
  }
];

export default routes