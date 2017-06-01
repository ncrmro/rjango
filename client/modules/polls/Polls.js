import React from 'react';
import { createFragmentContainer, createRefetchContainer } from 'react-relay';
import Link from 'react-router-dom/es/Link';
import styles from './Polls.scss';

let Choice = ({ choice }) =>
  <div>
    {choice.choiceText}
    {choice.votes}
  </div>;

Choice = createFragmentContainer(Choice, {
  choice: graphql`
      fragment  Polls_choice on Choice {
          votes
          choiceText
      }
  `
});

const links = () =>
  <div>
      <Link to={`/polls/${question.id}/vote`} >Vote</Link>
      <Link to={`/polls/${question.id}/results`} >Results</Link>
    </div>

let Question = ({ question }) =>
  <div className={styles.question}>
    <Link to={`/polls/${question.id}/detail`} >{question.questionText}</Link>

    <ul>
      {question.choiceSet ? question.choiceSet.edges.map(({ node }) =>
        <li
          key={node.id}
        >
          <Choice choice={node} />

        </li>
      ) : 'loading...'}
    </ul>
  </div>;

Question = createFragmentContainer(Question, {
  question: graphql`
      fragment Polls_question on Question {
          id
          questionText
          choiceSet(first:10) {
              edges{
                  node{
                      id
                      ...Polls_choice
                  }
              }
          }
      }
  `
});

const PollsList = (props) =>
  <div className={styles.root} >
    <p>This is the polls app</p>
    <ul>

      {props.viewer.questions.edges ? props.viewer.questions.edges.map(
        ({ node }) =>
          <li key={node.id} >
            <Question question={node} />
          </li>
      ) : 'loading..'}
    </ul>
  </div>;


export default createRefetchContainer(PollsList, {
    viewer: graphql.experimental`
        fragment Polls_viewer on Viewer
         @argumentDefinitions(
            first: {type: "Int", defaultValue: 10},
        )
        {
            questions(first: $first){
                edges {
                    node {
                        id
                        ...Polls_question
                    }
                }
            }
        }
    `
  },
  graphql.experimental`
      query PollsListRefetchQuery($first: Int) {
          viewer{
              ...Polls_viewer @arguments(
                    first: $first,
                  )
          }
      }
  `
)