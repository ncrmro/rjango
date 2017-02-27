import Relay from "react-relay";

class LoginMutation extends Relay.Mutation {
    // This method should return a GraphQL operation that represents
    // the mutation to be performed. This presumes that the server
    // implements a mutation type named ‘login_user’.
    getMutation() {
        return Relay.QL`
            mutation { loginUser }
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
            fragment on LogInUserPayload {
                authFormPayload{
                    __typename
                    ... on Viewer{
                        tokens{
                            __typename
                            ... on TokensSuccess {
                                token
                            }
                            ... on TokenError {
                                error
                            }
                        }
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
                fragment on LogInUserPayload {
                    authFormPayload{
                    __typename
                    ... on Viewer{
                        user{email}
                        tokens{
                            __typename
                            ... on TokensSuccess {
                                token
                            }
                            ... on TokenError {
                                error
                            }
                        }
                    }
                }
                }
            `],
        }];
    }

}

export default LoginMutation;
