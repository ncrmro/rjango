import { setToken } from '../utils/Jwt'

const {
  commitMutation,
  graphql
} = require('react-relay')

function loginUser(setErrors, response, logincb) {
  const { login, signup } = response
  response = login || signup
  response = response.authFormPayload
  if (response.__typename === 'FormErrors') {
    setErrors(response.errors)
  }
  else if (response.__typename === 'Viewer') {
    setToken(response.tokens.token, logincb)
  }

}
const mutation = graphql`
    mutation UserLoginMutation(
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

function commit(environment,
                email,
                password, login) {
  commitMutation(
    environment,
    {
      mutation,
      onCompleted: response => loginUser(() => {
      }, response, login),
      variables: {
        input: {
          email,
          password
        }
      }
    }
  )
}

export default { commit }
