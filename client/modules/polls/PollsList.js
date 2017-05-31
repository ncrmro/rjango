import React from 'react';
import { createRefetchContainer } from 'react-relay';

const PollsList = (props) =>
  <div style={{ justifyContent: 'center' }} >
    <p>This is the polls app</p>
    <ul>
      {props.viewer.questions.edges.map(
        ({ node }) =>
          <li
            key={node.id}
          >
            {node.questionText}
            {console.log(node)}
            {node.choiceSet.edges.map(({ node }) =>
              <div
                key={node.id}
              >
                {node.choiceText}
                {node.votes}
              </div>
            )}
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