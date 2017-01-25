import AppContainer from "../components/App/AppContainer";
import Landing from "../components/Landing/LandingContainer";
import ViewerQuery from './ViewerQuery';


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
