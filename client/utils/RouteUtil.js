/* eslint-disable */

import React from 'react'
import Route from 'react-router-dom/es/Route'
import Switch from 'react-router-dom/es/Switch'

import queryString from 'query-string'

export const cleanNullKeysFromObject = (object) => {
  // Remove null values from object
  Object.keys(object).forEach(key => (object[key] == null) && delete object[key])
  return object
}

export const parseUrlParams = (initialVariables) => {
  const parsed = queryString.parse(window.location.search)
  for (const index in parsed) {
    const attr = parsed[index]
    initialVariables[index] = attr
  }

  initialVariables = cleanNullKeysFromObject(initialVariables)

  return initialVariables
}

function RenderRoutes(props) {
  const _subRoutes = (route, router) => {
    const newProps = { router, ...props }
    if (route.indexRoute) {
      return (
        <route.component {...newProps} >
          <route.indexRoute.component {...newProps} />
          {_renderRoutes(route.childRoutes)}
        </route.component>
      )
    }
    if (route.childRoutes) {
      return (
        <route.component {...newProps} >
          {_renderRoutes(route.childRoutes)}
        </route.component>
      )
    }
    return <route.component {...newProps} />
  }

  const _renderRoutes = routes =>
    <Switch>
      {routes.map((route, i) => (
        <Route
          key={i}
          exact
          path={route.path}
          render={router => _subRoutes(route, router)}
        />
      ))}
    </Switch>
  return _renderRoutes(props.routes)
}

export default RenderRoutes
