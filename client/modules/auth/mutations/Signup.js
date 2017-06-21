const {
  commitMutation,
  graphql,
} = require('react-relay')


function loginUser(router, setErrors, response) {
  const { login, signup } = response
  response = login || signup
  response = response.authFormPayload
  if (response.errors.length > 0) {

    setErrors(response.errors)
  }
  else {
    router.push()
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

function Signup(environment, router, setErrors, input: { email: string, password: string }) {
  commitMutation(
    environment,
    {
      mutation,
      onCompleted: response => loginUser(router, setErrors, response),
      variables: {
        input
      }
    },
  )
}

export default Signup
