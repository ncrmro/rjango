import App from '../components/App/App';
import Landing from '../components/Landing/LandingComponent';


 const routes = [
  {
    path: '/',
    component: App,
    routes: [
      { 
        path: '/' ,
        component: Landing
      }
    ]
  }
];

export default routes