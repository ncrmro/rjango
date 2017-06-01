import React from 'react';
import { createRefetchContainer } from 'react-relay';

const Choice = ({ choice }) =>
  <div>
    {choice.choiceText}
    {choice.votes}
  </div>;

const Question = ({ question }) =>
  <div>
    {question.questionText}
    <ul>
      {question.choiceSet.edges.map(({ node }) =>
        <li
          key={node.id}
        >
          <Choice choice={node} />

        </li>
      )}
    </ul>
  </div>;

const PollsList = (props) =>
  <div  >
    <p>This is the polls app</p>

    <ul>
      {props.viewer.questions.edges.map(
        ({ node }) =>
          <li key={node.id} >
            <Question question={node} />
          </li>
      )}
    </ul>
  </div>;


export default createRefetchContainer(PollsList,{
    viewer: graphql`
        fragment PollsList_viewer on Viewer {
            questions(first: 10){
                edges {
                    node {
                        id
                        questionText
                        choiceSet(first:10) {
                            edges{
                                node{
                                    id
                                    votes
                                    choiceText
                                }
                            }
                        }
                    }
                }
            }
        }
    `},
  graphql`
      query PollsListRefetchQuery($count: Int) {
          viewer{
              ...PollsList_viewer
          }
      }
  `
)