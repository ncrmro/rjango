import React from 'react';
import { createRefetchContainer } from 'react-relay';

const PollsList = (props) =>
  <div>
    {console.log('polls', props.viewer)}
    <p>This is the polls app</p>
  </div>;


export default createRefetchContainer(PollsList,{
    viewer: graphql`
        fragment PollsList_viewer on Viewer {
            questions(first: 10){
                edges {
                    node {
                        id
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