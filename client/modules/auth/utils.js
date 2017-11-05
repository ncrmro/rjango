import React, { Component } from 'react'
import { hasValidJwtToken } from './jwtUtils'

export const postAuthRoute = '/polls'

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

    componentWillMount() {
      const parsedToken = hasValidJwtToken().parsedToken
      if (parsedToken) {
        const nextState = {
          viewer: {
            isAuthenticated: true,
            user: {
              email: parsedToken.email
            }
          }
        }
        if (parsedToken.is_superuser) {
          nextState.viewer.isAdmin = true
        }
        this.setState(nextState)
      }
      else if (!parsedToken) {
        this.setState({ viewer: { isAuthenticated: false } })
      }
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
      const { router, viewer: { isAuthenticated, isAdmin } } = this.props
      if (!isAuthenticated || !isAdmin) {
        router.push('/')
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

    componentWillMount() {
      const { router: { history }, viewer: { isAuthenticated } } = this.props
      if (!requireAuth && isAuthenticated) {
        // If route is meant for non authenticated user redirect to profile
        history.push(postAuthRoute)
      } else if (requireAuth && !isAuthenticated) {
        // If route is meant for authenticated user redirect to login page
        history.push('/login')
      }
    }

    render() {
      return <ComposedClass {...this.props} />
    }

  }

  return isAuthenticated(RequireAuth)
}
