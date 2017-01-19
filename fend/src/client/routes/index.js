import AppContainer from "../components/App/AppContainer";
import Dashboard from "../components/Dashboard/DashboardComponent";

export default {
  component: AppContainer,
  path: '/',
  indexRoute: {
    component: Dashboard
  },
  childRoutes: [
    require('./landing')
  ]
};
