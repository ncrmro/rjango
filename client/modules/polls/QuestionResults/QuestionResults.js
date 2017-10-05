import React from 'react'
import Page from 'components/Page/Page'
import styles from '../Polls.scss'

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
  return values
}

let QuestionResults = ({ viewer: { question } }) =>
  <Page heading='Question' className={styles.pollDetailRoot} >

    <h3>Results: </h3>
    <h2>{question.questionText}</h2>

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
  </Page>


const query = graphql`
    query QuestionResultsQuery($id: ID!) {
        viewer{
            question(id: $id) {
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
        }
    }
`
export default withRelayContainer(QuestionResults, query)

