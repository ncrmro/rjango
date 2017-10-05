const {
  commitMutation,
  graphql
} = require('react-relay')

const mutation = graphql`
    mutation VoteMutation(
    $input: VoteMutationInput!
    ) {
        vote(input : $input) {
            question {
                id
                choiceSet {
                    edges {
                        node {
                            voteCount
                        }
                    }
                }
            }
        }
    }
`
/*
 function sharedUpdater(store, questionProxy, variables) {
 const conn = ConnectionHandler.getConnection(
 questionProxy,
 'PollChoices_choiceSet',
 variables
 );
 }
 */

function Vote(environment, input, callback) {
  commitMutation(
    environment,
    {
      mutation,
      variables: {
        input
      },
      onCompleted: callback()
      /*
       updater: (store) => {
       const payload = store.getRootField('vote');
       const questionProxy = payload.getLinkedRecord('question');
       sharedUpdater(store, questionProxy, variables);
       },
       optimisticUpdater: (store) => {
       const questionProxy = store.get(question.id);
       sharedUpdater(store, questionProxy, variables);
       }
       */
    }
  )
}

export default Vote
