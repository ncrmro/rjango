import AppContainer from "../components/App/AppContainer";
//import AppComponent from "../components/App/AppComponent";
import Landing from "../components/Landing/LandingContainer";
import ViewerQuery from './ViewerQuery';


function jwtToken() {
  console.log("Prepaire prearms jwtoken");

  let jwtToken = localStorage.getItem("jwtToken");
  if (jwtToken) {
    return {
      jwtToken
    }
  }
  else {
    console.log("jwtToken not set");

    jwtToken = "";
    return jwtToken
  }

}

export default () => {
  return {
    childRoutes: [{
      path: '/',
      component: AppContainer,
      queries: ViewerQuery,
      prepareParams: jwtToken,
      indexRoute: {
        queries: ViewerQuery,
        component: Landing
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
