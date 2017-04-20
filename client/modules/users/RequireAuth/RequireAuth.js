import React, { Component } from 'react';
import isAuthenticatedComponent from '../isAuthenticated/isAuthenticatedComponent';

export default function (ComposedClass) {
  class RequireAuth extends Component {
    static propTypes = {
      isAuthenticated: React.PropTypes.bool.isRequired,
      router: React.PropTypes.object.isRequired
    };

    componentWillMount() {
      const { router, isAuthenticated } = this.props;
      if (!isAuthenticated) {
        router.push('/');
      }
    }

    render() {
      return <ComposedClass {...this.props} />;
    }

    }

  return isAuthenticatedComponent(RequireAuth);
}
