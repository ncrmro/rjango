import React, { Component } from 'react';
import { hasValidJwtToken } from './jwtUtils';


export function isAuthenticated(ComposedClass) {
  // Higher order component used to check if the user is authenticated
  class isAuthenticated extends Component {
    constructor(props) {
      super(props);
      this.state = {
        isAuthenticated: false,
        isAdmin: false
      };
    }

    componentWillMount() {
      const parsedToken = hasValidJwtToken().parsedToken;
      if (parsedToken) {
        this.setState({ isAuthenticated: true });
        if (parsedToken.is_superuser) {
          this.setState({ isAdmin: true });
        }
      }
      if (!parsedToken) {
        this.setState({ isAuthenticated: false });
      }
    }

    render() {
      const { isAdmin, isAuthenticated } = this.state;
      return (<ComposedClass
        isAdmin={isAdmin}
        isAuthenticated={isAuthenticated} {...this.props}
      />);
    }

  }

  return isAuthenticated;
}


export function authenticatedRoute(requireAuth = true, ComposedClass) {
  // Higher order component used to restrict routes depending on if users is authenticated or not.
  class RequireAuth extends Component {

    componentWillMount() {
      const { router: { history }, isAuthenticated } = this.props;
      if (!requireAuth && isAuthenticated) {
        // If route is meant for non authenticated user redirect to profile
        history.push('/profile');
      } else if (requireAuth && !isAuthenticated) {
        // If route is meant for authenticated user redirect to login page
        history.push('/login');
      }
    }

    render() {
      return <ComposedClass {...this.props} />;
    }

  }

  return isAuthenticated(RequireAuth);
}
