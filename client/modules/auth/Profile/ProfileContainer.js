import Relay from 'react-relay';
import Profile from './ProfileComponent';
import ProfileMutation from './ProfileMutation';

export default Relay.createContainer(Profile, {
  fragments: {
    viewer: () => Relay.QL`
            fragment on Viewer {
                id,
                user{email},
                ${ProfileMutation.getFragment('viewer')}
            }`
  }
});
