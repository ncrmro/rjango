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

type NewSellOrderInput = {
  amount: string,
  partSlug: string,
  addressId: string,
  condition: string,
}
function NewPollMutation(environment, setErrors, input: NewSellOrderInput, callback) {
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
