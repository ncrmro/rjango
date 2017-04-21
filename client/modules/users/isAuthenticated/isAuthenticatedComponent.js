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
      return <ComposedClass isAdmin={isAdmin} isAuthenticated={isAuthenticated} {...this.props} />;
    }

  }

  return isAuthenticatedComponent;
}
