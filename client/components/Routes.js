import React, { Component } from 'react'
import { Route } from 'react-router'

import { authenticatedRoute } from '../utils/Auth'
import Topics from './Topics'
import Auth from './Auth'
import { View } from 'react-native'
import Home from './Home'
import QuestionBrowser from './QuestionBrowser'
let UnAuthenicatedRoutes = (props) =>
  <View  >
    <Route
      path="/signup"
      render={lprops => <Auth {...lprops} login={props.login} />}

      {...props}
    />
    <Route
      path="/login"
      render={lprops => <Auth {...lprops} login={props.login} />}
      {...props}/>
  </View>
let AuthenticatedRoutes = (props) =>
  <View  >
    <Route exact path="/" component={Home} {...props}/>
    <Route path="/polls" component={QuestionBrowser} {...props}/>
    <Route path="/topics" component={Topics} {...props}/>
  </View>

AuthenticatedRoutes = authenticatedRoute(AuthenticatedRoutes)


export {
  UnAuthenicatedRoutes,
  AuthenticatedRoutes
}