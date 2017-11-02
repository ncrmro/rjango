import { commitMutation, graphql } from 'react-relay'

const mutation = graphql`
    mutation NewPollMutation(
    $input: CreatePollMutationInput!
    ) {
        createPoll(input : $input) {
            poll{
                questionText
            }
        }
    }
`


function NewPollMutation(environment, input, callback) {
  commitMutation(
    environment,
    {
      mutation,
      onCompleted: response => callback(),
      variables: {
        input
      }
    }
  )
}

export default NewPollMutation
