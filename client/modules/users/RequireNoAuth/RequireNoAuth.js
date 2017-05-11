import React, { Component } from 'react';
import isAuthenticatedComponent from '../isAuthenticated/isAuthenticatedComponent';


export default function (ComposedClass) {
  class RequireNoAuth extends Component {

    componentWillMount() {
      const { router, isAuthenticated } = this.props;
      if (isAuthenticated) {
        router.push('/profile');
      }
    }


    render() {
      return <ComposedClass {...this.props} />;
    }

    }

  return isAuthenticatedComponent(RequireNoAuth);
}
