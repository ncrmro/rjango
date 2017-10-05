import React from 'react'
import { createFragmentContainer } from 'react-relay'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'

import withRelayContainer from 'utils/relay'

const getChartDataFromRelayEdges = (edges) => {
  let values = []
  edges.map(({ node }) => {
    let newNode = { ...node }
    values = values.concat(newNode)
  })
  console.log(values[0])
  return values
}

let QuestionResults = ({ question }) =>
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


  </div>

QuestionResults = createFragmentContainer(QuestionResults, {
  question: graphql`
      fragment QuestionResults_question on Question {
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
})

export default withRelayContainer(QuestionResults)
