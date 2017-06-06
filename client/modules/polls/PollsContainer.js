import React from 'react';
import { graphql, QueryRenderer } from 'react-relay';

function withRelayContainer(WrappedComponent, selectData) {
  return ({ environment, variables, router }) =>
    <QueryRenderer
      environment={environment}
      query={graphql`
                query PollsContainerQuery($id: ID!) {
                  question(id: $id) {
                  id
                  ...PollsVote_question
                  ...PollsResults_question

                  }
                }
          `}
      variables={{ id: router.match.params.id }}
      render={({ error, props }) => props ?
        <WrappedComponent
          {...props}
          router={router}
          environment={environment}
          initialVariables={{ id: router.match.params.id }}
        /> :
        <div>loading...</div>}
    />;
}

export default withRelayContainer;
