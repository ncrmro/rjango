import React, {Component} from 'react';
import {jwtTokenParam} from '../JwtUtils'


export default function (ComposedClass) {
    class isAuthenticated extends Component {
        

        constructor(props) {
            super(props);
            this.state = {
                isAuthenticated: false
            };
        }

        componentWillMount() {
            let jwtToken = localStorage.getItem("jwtToken");
            const authenticated_token = jwtTokenParam(jwtToken);
            if (authenticated_token) {
                this.setState({isAuthenticated: true});
            }
            if (!authenticated_token) {
                this.setState({isAuthenticated: false});

            }
        }

        render() {
            return <ComposedClass isAuthenticated={this.state.isAuthenticated} {...this.props}/>
        }

    }

    return isAuthenticated
}