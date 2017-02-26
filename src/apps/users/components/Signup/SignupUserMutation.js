import Relay from "react-relay";

class SignupUserMutation extends Relay.Mutation {

    getMutation() {
        return Relay.QL`
            mutation { createUser }
        `;
    }

    getVariables() {
        return {
            email: this.props.email,
            password: this.props.password
        };
    }

    getFatQuery() {
        return Relay.QL`
            fragment on CreateUserPayload {
                authFormPayload{
                    __typename
                    ... on Viewer {
                        tokens
                        user{
                            firstName, email
                        }
                    }
                    ... on AuthFormError {
                        error
                    }
                }

            }
        `;
    }

    getConfigs() {
        return [{
            type: 'REQUIRED_CHILDREN',
            // Forces these fragments to be included in the query
            children: [Relay.QL`
                fragment on CreateUserPayload {
                    authFormPayload{
                    __typename
                    ... on Viewer {
                        tokens
                        user{
                            firstName, email
                        }
                    }
                    ... on AuthFormError {
                        error
                    }
                }
                }
            `],
        }];
    }
}

export default SignupUserMutation;
