import Relay from "react-relay";

class EditProfileMutation extends Relay.Mutation {
    // This method should return a GraphQL operation that represents
    // the mutation to be performed. This presumes that the server
    // implements a mutation type named ‘loginUser’.
    static fragments = {
        viewer: () => Relay.QL`
            fragment on Viewer {
                id,

            }`,
    };
    getMutation() {
        return Relay.QL`
            mutation { loginUser }
        `;
    }

    getVariables() {
        return {
            id: this.props.viewer.id,
            email: this.props.email,
            password: this.props.password
        };
    }

    getFatQuery() {
        return Relay.QL`
            fragment on LogInUserPayload {
                viewer{
                    id,
                    user{
                        id,
                        email,
                        dateJoined,
                    }
                    jwtToken
                },
                
            }
            
        `;
    }

    getConfigs() {
        return [{
            type: 'FIELDS_CHANGE',
            fieldIDs: {
                viewer: this.props.viewer.id
            }
        }];
    }


}

export default EditProfileMutation;
