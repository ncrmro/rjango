import Relay from "react-relay";
import Landing from "./isAuthenticated";

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
