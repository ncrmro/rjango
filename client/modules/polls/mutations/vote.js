import { ConnectionHandler } from 'relay-runtime';
const {
  commitMutation,
  graphql,
} = require('react-relay');

const mutation = graphql`
    mutation voteMutation(
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
`;

function sharedUpdater(store, questionProxy, variables) {
  const conn = ConnectionHandler.getConnection(
    questionProxy,
    'PollChoices_choiceSet',
    variables
  );
}


function Vote(environment, question, choice, variables) {
  commitMutation(
    environment,
    {
      mutation,
      variables: {
        input: { questionId: question.id, choiceId: choice.id}
      },
      updater: (store) => {
        const payload = store.getRootField('vote');
        const questionProxy = payload.getLinkedRecord('question');
        sharedUpdater(store, questionProxy, variables);
      },
      optimisticUpdater: (store) => {
        const questionProxy = store.get(question.id);
        sharedUpdater(store, questionProxy, variables);
      }
    },
  );
}

export default Vote;