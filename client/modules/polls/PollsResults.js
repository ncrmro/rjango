import React from 'react';
import { createFragmentContainer } from 'react-relay';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis
} from 'Recharts';

import withRelayContainer from './PollsContainer';

const getChartDataFromRelayEdges = (edges) => {
  let values = [];
  edges.map(({ node }) => {
    let newNode = {...node};
    values = values.concat(newNode);
  });
  console.log(values[0]);
  return values
};

let PollsResult = ({ question }) =>
  <div >
    <h3>Results: </h3>

    <BarChart
      width={600}
      height={300}
      data={getChartDataFromRelayEdges(question.choiceSet.edges)}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    >
      <XAxis dataKey="choiceText" />
      <YAxis dataKey="voteCount" />
      <CartesianGrid  />
      <Tooltip/>
      <Legend />
      <Bar dataKey="voteCount" fill="#8884d8" />
    </BarChart>


  </div>;

PollsResult = createFragmentContainer(PollsResult, {
  question: graphql`
      fragment PollsResults_question on Question {
          id
          questionText
          choiceSet(first:10){
              edges{
                  node{
                      id
                      choiceText
                      voteCount
                  }
              }
          }
      }
  `
});

export default withRelayContainer(PollsResult);
