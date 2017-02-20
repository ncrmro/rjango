import React, {Component} from 'react';

export default function (ComposedClass) {
    class AuthenticationCheck extends Component {
        componentWillMount() {
           if (!this.props.viewer.email) {
                this.props.router.push('/');
            }
        }

        render() {
            return <ComposedClass {...this.props}/>
        }

    }

    return AuthenticationCheck
}