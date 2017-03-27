import React, { Component } from 'react';
import hasValidJwtToken from '../JwtUtils';


export default function (ComposedClass) {
  class isAuthenticatedComponent extends Component {
    constructor(props) {
      super(props);
      this.state = {
        isAuthenticated: false,
        isAdmin: false
      };
    }

    componentWillMount() {
      const authenticatedToken = hasValidJwtToken();
      if (authenticatedToken) {
        this.setState({ isAuthenticated: true });
        if (authenticatedToken.is_superuser) {
          this.setState({ isAdmin: true });
        }
      }
      if (!authenticatedToken) {
        this.setState({ isAuthenticated: false });
      }
    }

    render() {
      const { isAdmin, isAuthenticated } = this.state;
      return <ComposedClass isAdmin={isAdmin} isAuthenticated={isAuthenticated} {...this.props} />;
    }

  }

  return isAuthenticatedComponent;
}
