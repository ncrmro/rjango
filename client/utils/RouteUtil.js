/* eslint-disable */

import React from 'react'
import Route from 'react-router-dom/es/Route'
import Switch from 'react-router-dom/es/Switch'

import queryString from 'query-string'
//import analyticsCallback from './analyticsCallback'

export const cleanNullKeysFromObject = (object) => {
  // Remove null values from object
  Object.keys(object).forEach(key => (object[key] == null) && delete object[key])
  return object
}

function isObject(val) {
  if (val === null) {
    return false
  }
  return ( (typeof val === 'function') || (typeof val === 'object') )
}


function parseSubObjects(obj) {
  for (const key in obj) {
    if (isObject(obj[key])) {
      obj[key] = JSON.parse(obj[key])
    }
  }
  return obj
}

export const parseUrlParams = (initialVariables? = {}) => {
  let parsed = queryString.parse(window.location.search)
  parsed = parseSubObjects(parsed)
  for (const index in parsed) {
    const attr = parsed[index]
    initialVariables[index] = attr
  }

  initialVariables = cleanNullKeysFromObject(initialVariables)

  return initialVariables
}


function RenderRoutes(props) {
  const _subRoutes = (route, router) => {
    router.urlParams = parseUrlParams()
    router.queryString = queryString
    router.pushParams = params => router.history.push(`?${queryString.stringify(params)}`)
    const newProps = { router, ...props }
    //analyticsCallback(newProps)
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
