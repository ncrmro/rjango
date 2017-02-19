import Relay from "react-relay";
import Landing from "./LandingComponent";

export default Relay.createContainer(Landing, {
    fragments: {
        viewer: () => Relay.QL`
            fragment on Viewer {
                user{
                    email
                }
            }`
    }
});
