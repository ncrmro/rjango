import { ConnectionHandler } from 'relay-runtime';

const {
  commitMutation,
  graphql,
} = require('react-relay');

const mutation = graphql`
    mutation LoginMutation(
    $input: LoginMutationInput!
    ) {
        login(input : $input) {
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

function Login(environment, input: {email: string, password: string}) {
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

export default Login;
