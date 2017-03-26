import Relay from 'react-relay';
import isAuthenticatedComponent from './isAuthenticatedComponent';

export default Relay.createContainer(isAuthenticatedComponent, {
  fragments: {
    viewer: () => Relay.QL`
            fragment on Viewer {
                id
                user {
                    email
                    dateJoined
                }
            }`
  }
});
