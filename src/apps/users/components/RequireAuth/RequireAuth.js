import React, {Component} from 'react';
import isAuthenticated from '../isAuthenticated/isAuthenticated'

export default function (ComposedClass) {
    class RequireAuth extends Component {
        static propTypes = {
            isAuthenticated: React.PropTypes.bool.isRequired,
            router: React.PropTypes.object.isRequired
        };

        componentWillMount() {
            const {router, isAuthenticated} = this.props;
            if (!isAuthenticated) {
                router.push('/');
            }
        }

        render() {
            return <ComposedClass  {...this.props}/>
        }

    }

    return isAuthenticated(RequireAuth)
}