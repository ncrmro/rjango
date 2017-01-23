import AppContainer from "../components/App/AppContainer";
//import AppComponent from "../components/App/AppComponent";
import Dashboard from "../components/Dashboard/DashboardComponent";
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
        component: Landing
      },
      childRoutes: [
        require('./signup').default,
        require('./login').default,
        {
          path: '*',
          component: Dashboard
        }
      ]
    }]
  }
}
