import React from 'react';
import { createFragmentContainer, graphql, QueryRenderer } from 'react-relay';
import Link from 'react-router-dom/es/Link';
import Page from 'components/Page/Page';
import styles from './Polls.scss';

const PollActions = ({question}) =>
  <div className={styles.pollDetailActions}>
      <Link to={`/polls/${question.id}/vote`} >Vote</Link>
    <Link to={`/polls/${question.id}/results`} >Results</Link>
  </div>

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
  <Page heading="Polls Detail" className={styles.pollDetailRoot}>

    <div>
      {question.questionText}
      <br/>
      <PollActions question={question} />
      <ul>
        {question.choiceSet ? question.choiceSet.edges.map(({ node }) =>
          <li key={node.id} >
            <Choice choice={node} />
          </li>
        ) : 'loading...'}
        {question.choiceSet.edges.length > 0 ? null : 'None found'}

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
