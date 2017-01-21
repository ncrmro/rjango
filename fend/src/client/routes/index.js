import AppContainer from "../components/App/AppContainer";
import AppComponent from "../components/App/AppComponent";
import Dashboard from "../components/Dashboard/DashboardComponent";
import ViewerQuery from './ViewerQuery';

export default () => {
  return {
    childRoutes: [{
      path: '/',
      component: AppComponent,
      indexRoute: {
        component: Dashboard
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
