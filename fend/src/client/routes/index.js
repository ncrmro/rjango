import AppContainer from "../components/App/AppContainer";
import Dashboard from "../components/Dashboard/DashboardComponent";
import FeatureContainer from '../components/Feature/FeatureContainer';
import ViewerQuery from './ViewerQuery';


export default () => {
  return {
    childRoutes: [{
      path: '/',
      component: AppContainer,
      indexRoute: {component: Dashboard},
      childRoutes: [
        require('./landing')
      ]
    }]
  }
}
