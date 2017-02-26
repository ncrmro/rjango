import AppContainer from "../components/App/AppContainer";
import Landing from "../components/Landing/LandingContainer";
import ViewerQuery from './queries/ViewerQuery';




export default () => {
  return {
    childRoutes: [{
      path: '/',
      component: AppContainer,
      queries: ViewerQuery,
      indexRoute: {
        queries: ViewerQuery,
        component: Landing
      },
      childRoutes: [
        require('../apps/users/routes/signup').default,
        require('../apps/users/routes/login').default,
        require('../apps/users/routes/profile').default,
        require('./routes/dashboard').default,
        {
          path: '*',
          component: Landing
        }
      ]
    }]
  }
}
