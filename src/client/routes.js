import AppContainer from "../components/App/AppContainer";
import Landing from "../components/Landing/LandingContainer";
import ViewerQuery from './queries/ViewerQuery';


const auth = () => {
  let jwtToken = localStorage.getItem("jwtToken");
  if (!jwtToken) {
    console.log("no Token!")
  }
  console.log('onEnter', jwtToken);
};

export default () => {
  return {
    onEnter: auth(),
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
