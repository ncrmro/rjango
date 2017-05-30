import React from 'react';
import { createRefetchContainer } from 'react-relay';

const PollsList = (props) =>
  <div>
    <p>This is the polls app</p>
    {props.viewer.questions.edges.map(
      ({node}) =>
        <div key={node.id}> {node.questionText}</div>

    )}
  </div>;


export default createRefetchContainer(PollsList,{
    viewer: graphql`
        fragment PollsList_viewer on Viewer {
            questions(first: 10){
                edges {
                    node {
                        id
                        questionText
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