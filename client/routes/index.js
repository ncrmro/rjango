import AppContainer from '../components/App/AppComponent';
import Landing from '../components/Landing/LandingComponent';
//import UserRoutes from './users';


 const routes = [
  { path: '/',
    component: AppContainer,
    routes: [
      { path: '/landing' ,
        component: Landing
      }
    ]
  }
];

export default routes