import React, { Component } from 'react'
import { hasValidJwtToken } from './Jwt'
import { withRouter } from 'react-router-native'
export const postAuthRoute = '/topics'

export async function CheckAuth() {
  const { parsedToken } = await hasValidJwtToken()
  const nextState = {
    viewer: {
      isAuthenticated: false
    }
  }
  if (parsedToken) {
    nextState.viewer.isAuthenticated = true
    if (parsedToken.is_superuser) {
      nextState.viewer.isAdmin = true
    }
  }
  else if (!parsedToken) {
    nextState.viewer.isAuthenticated = false
  }
  return nextState
}


export function isAuthenticated(ComposedClass) {
  // Higher order component used to check if the user is authenticated
  class isAuthenticated extends Component {
    constructor(props) {
      super(props)
      this.state = {
        viewer: {
          ...props.viewer,
          isAuthenticated: false,
          isAdmin: false
        }
      }
    }

    async setStateAsync(state) {
      return new Promise((resolve) => {
        this.setState(state, resolve)
      })
    }

    async componentWillMount() {
      const nextState = await CheckAuth()
      this.setStateAsync(nextState)

    }

    render() {
      const nextProps = {
        ...this.props,
        viewer: {
          ...this.state.viewer,
          ...this.props.viewer
        }
      }
      return <ComposedClass
        {...nextProps}
      />
    }

  }

  return isAuthenticated
}

export function requireAdminRoute(ComposedClass) {
  class RequireAdmin extends Component {
    componentWillMount() {
      const { history, viewer: { isAuthenticated, isAdmin } } = this.props
      if (!isAuthenticated || !isAdmin) {
        history.push('/')
      }
    }

    render() {
      return <ComposedClass {...this.props} />
    }

  }
  return isAuthenticated(RequireAdmin)
}


export function authenticatedRoute(ComposedClass, requireAuth = true) {
  // Higher order component used to restrict routes depending on if users is authenticated or not.
  class RequireAuth extends Component {
    async componentWillMount() {
      const {viewer} = await CheckAuth()
      const { history } = this.props
      if (!requireAuth && viewer.isAuthenticated) {
        // If route is meant for non authenticated user redirect to profile
        history.push(postAuthRoute)
      } else if (requireAuth && !viewer.isAuthenticated) {
        // If route is meant for authenticated user redirect to login page
        history.push('/login')
      }
    }

    render() {
      return <ComposedClass {...this.props} />
    }

  }

  return withRouter(RequireAuth)
}
