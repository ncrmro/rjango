import Relay from "react-relay";

class LoginMutation extends Relay.Mutation {
    // This method should return a GraphQL operation that represents
    // the mutation to be performed. This presumes that the server
    // implements a mutation type named ‘loginUser’.
    getMutation() {
        return Relay.QL`
            mutation { loginUser }
        `;
    }

  getVariables() {
    return {
      username: this.props.username,
      password: this.props.password
    };
  }

    getFatQuery() {
        return Relay.QL`
            fragment on LogInUserPayload {
                viewer{
                    id,
                    username,
                    email,
                    dateJoined,
                },
                jwtToken
            }
        `;
    }

    getConfigs() {
        return [{
          type: 'REQUIRED_CHILDREN',
            // Forces these fragments to be included in the query
            children: [Relay.QL`
                fragment on LogInUserPayload {
                    viewer {
                        id,
                        username,
                        email,
                        dateJoined,
                    },
                    jwtToken
                }
            `],
        }];
    }

}

export default LoginMutation;
