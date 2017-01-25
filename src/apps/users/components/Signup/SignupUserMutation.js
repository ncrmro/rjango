import Relay from "react-relay";

class SignupUserMutation extends Relay.Mutation {

    getMutation() {
        return Relay.QL`
            mutation { createUser }
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
            fragment on CreateUserPayload {
                viewer { username, firstName, email }
            }
        `;
    }

  getConfigs() {
        return [{
          type: 'REQUIRED_CHILDREN',
            // Forces these fragments to be included in the query
            children: [Relay.QL`
                fragment on CreateUserPayload {
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

export default SignupUserMutation;
