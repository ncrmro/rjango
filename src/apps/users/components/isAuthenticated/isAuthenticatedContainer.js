import Relay from 'react-relay';
import Landing from './isAuthenticatedComponent';

export default Relay.createContainer(Landing, {
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
