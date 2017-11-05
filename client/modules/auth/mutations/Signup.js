const {
  commitMutation,
  graphql,
} = require('react-relay')
import { setToken } from '../jwtUtils';


function loginUser(setErrors, response) {
  const { login, signup } = response
  response = login || signup
  response = response.authFormPayload
  if (response.__typename === "FormErrors") {
    setErrors(response.errors)
  }
  else if (response.__typename === "Viewer") {
    setToken(response.tokens.token)
  }

}

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
                        }
                        
                    }
                    ... on FormErrors {
                      errors{
                        key 
                        message
                      }
                    }
                }
        }
    }
`

function Signup(environment, setErrors, input: { email: string, password: string }) {
  commitMutation(
    environment,
    {
      mutation,
      onCompleted: response => loginUser(setErrors, response),
      variables: {
        input
      }
    },
  )
}

export default Signup
