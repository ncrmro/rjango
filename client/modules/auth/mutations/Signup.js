import { ConnectionHandler } from 'relay-runtime';

const {
  commitMutation,
  graphql,
} = require('react-relay');

const mutation = graphql`
    mutation SignupUserMutation(
    $input: SignupUserMutationInput!
    ) {
        signup(input : $input) {
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
    }
`;

function Signup(environment, input: {email: string, password: string}) {
  commitMutation(
    environment,
    {
      mutation,
      variables: {
        input
      }
    },
  );
}

export default Signup;
