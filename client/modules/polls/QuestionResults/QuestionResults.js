import React from 'react'
import { createFragmentContainer, graphql } from 'react-relay'
import styles from './QuestionResults.scss'

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'


const getChartDataFromRelayEdges = (edges) => {
  let values = []
  edges.map(({ node }) => {
    let newNode = { ...node }
    values = values.concat(newNode)
  })
  return values
}

export let QuestionResults = (props) =>
  <div className={styles.root} >
    <div>
      <h3>Results: </h3>
      <h2>{props.question.questionText}</h2>

      <div className={styles.chart}>
        <BarChart
          // 90% screen width
          width={window.screen.width * .9}
          height={300}
          data={getChartDataFromRelayEdges(props.question.choiceSet.edges)}
        >
          <XAxis dataKey="choiceText" />
          <YAxis dataKey="voteCount" />
          <CartesianGrid  />
          <Tooltip/>
          <Legend />
          <Bar dataKey="voteCount" fill="#8884d8" />
        </BarChart>
      </div>
    </div>
  </div>

export default createFragmentContainer(QuestionResults, {
    question: graphql`
        fragment QuestionResults_question on Question {
            id
            questionText
            choiceSet(first:10){
                edges{
                    node {
                        id
                        choiceText
                        voteCount
                    }
                }
            }
        }
    `
  }
)









