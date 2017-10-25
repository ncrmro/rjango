import React from 'react'
import { authenticatedRoute } from 'modules/auth/utils'
import Bundle from 'utils/bundleLoader'

const Auth = props =>
  <Bundle
    load={() =>
      import(/* webpackChunkName: "auth" */ 'modules/auth/Auth')}
  >
    { ViewerOrders => <ViewerOrders { ...props}/> }
  </Bundle>

const authRoutes = [
  {
    path: '/signup',
    component: authenticatedRoute(Auth, false)
  },
  {
    path: '/login',
    component: authenticatedRoute(Auth, false)
  }
]


export default authRoutes
