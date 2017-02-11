import Relay from "react-relay";
import Landing from "./LoginComponent";

export default Relay.createContainer(Landing, {
    fragments: {
        viewer: () => Relay.QL`
            fragment on Viewer {
                id
                user {
                    username
                    email
                    dateJoined
                }
            }`
    }
});
