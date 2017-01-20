import AppContainer from "../components/App/AppContainer";
import Dashboard from "../components/Dashboard/DashboardComponent";

export default () => {
  return {
    childRoutes: [{
      path: '/',
      component: AppContainer,
      indexRoute: {component: Dashboard},
      childRoutes: [
        require('./signup'),
        require('./login'),
        require('./landing')
      ]
    }]
  }
}
