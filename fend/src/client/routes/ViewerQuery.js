import Relay from "react-relay";

export default {
    viewer: Component => Relay.QL`
        query {
            viewer(jwtToken: "") {
                ${Component.getFragment('viewer')}
            }
        }
    `
};
