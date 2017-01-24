import AppContainer from "../components/App/AppContainer";
//import AppComponent from "../components/App/AppComponent";
import Landing from "../components/Landing/LandingContainer";
import ViewerQuery from './ViewerQuery';
import jwtTokenParam from '../utils/jwt_token'


export default () => {
  return {
    childRoutes: [{
      path: '/',
      component: AppContainer,
      queries: ViewerQuery,
      indexRoute: {
        queries: ViewerQuery,
        component: Landing,
      },
      childRoutes: [
        require('./signup').default,
        require('./login').default,
        require('./dashboard').default,

        {
          path: '*',
          component: Landing
        }
      ]
    }]
  }
}
