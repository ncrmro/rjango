import React from 'react';
import { createFragmentContainer, graphql, QueryRenderer } from 'react-relay';
import Page from 'components/Page/Page';
import styles from './Polls.scss';

let Choice = ({ choice }) =>
  <div>
    {choice.choiceText}
    {choice.votes}
  </div>;

Choice = createFragmentContainer(Choice, {
  choice: graphql`
      fragment  PollsDetail_choice on Choice {
          votes
          choiceText
      }
  `
});

const PollDetail = ({ question }) =>
  <Page heading="Polls Detail"  >

    <div>
      {console.log('poll detail', question)}
      {question.questionText}

      <ul>
        {question.choiceSet ? question.choiceSet.edges.map(({ node }) =>
          <li
            key={node.id}
          >


          </li>
        ) : 'loading...'}
      </ul>
    </div>
  </Page>;

export default class PollDetailContainer extends React.Component {
  render() {
    const { environment, router } = this.props;
    const variables = { id: router.match.params.id };
    console.log('poll detail container', variables);
    return (
      <QueryRenderer
        environment={environment}
        query={graphql`
                query PollsDetailQuery($id: ID!) {
                  question(id: $id) {
                  id
                      questionText
                      choiceSet(first:10) {
                          edges{
                              node{
                                  id
                                  ...PollsDetail_choice
                              }
                          }
                      }
                  }
                }
          `}
        variables={variables}
        render={({ error, props }) => props ?
          <PollDetail {...props} router={router} environment={environment}
                      initialVariables={variables}
          /> :
          <div>loading...</div>  }
      />
    )
  }
}
