import React from 'react'
import Page from 'components/Page/Page'
import { DataTable } from 'components/DataTable/DataTable'
import type { QuestionType } from './Question'
import Question from './Question'
import withRelayContainer from 'utils/relay'
import styles from '../Polls.scss'

const columns = [
  {
    label: 'Question',
    name: 'question'
  },
  {
    label: 'Votes',
    name: 'questionVotes'
  },
  {
    label: 'Action',
    name: 'action'
  }
]

type QuestionBrowserPropsType = {
  viewer: {
    questions: {
      edges: Array<{ node: QuestionType }>
    }
  }
}
const QuestionBrowser = (props: QuestionBrowserPropsType) =>
  <Page
    className={styles.root}
    heading='Polls'
  >
    <p>This is the polls app</p>
    <DataTable
      columns={columns}
    >
      {props.viewer.questions.edges ?
        props.viewer.questions.edges.map(({ node }) =>
          <Question
            key={node.id}
            question={node}
          />
        ) : 'loading..'}
    </DataTable>
  </Page>

const query = graphql`
    query QuestionBrowserQuery{
        viewer{
            id
            questions{
                edges {
                    node {
                        id
                        ...Question_question
                    }
                }
            }
        }
    }
`
export default withRelayContainer(QuestionBrowser, query)