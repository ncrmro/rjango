import React from "react";
import {IndexRoute, Route, Redirect} from "react-router";
import AppContainer from "../components/App/AppContainer";
import Dashboard from "../components/Dashboard/DashboardComponent";
import SignupComponent from "../components/Signup/SignupComponent";
import LoginComponent from "../components/Login/LoginComponent";
//import ViewerQuery from "./ViewerQuery";
//import FeatureContainer from "../components/Feature/FeatureContainer";

export default (
  <Route path='/' component={AppContainer}>
    <IndexRoute component={Dashboard}/>
    <Route path='/signup' component={SignupComponent}/>
    <Route path='/login' component={LoginComponent}/>
    <Redirect from='*' to='/'/>
  </Route>
);

