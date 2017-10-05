import React from 'react'
import Page from 'components/Page/Page'
import { DataTable } from 'components/DataTable/DataTable'
import type { QuestionType } from './Question'
import Question, {questionColumns} from './Question'
import withRelayContainer from 'utils/relay'
import styles from '../Polls.scss'

type QuestionBrowserPropsType = {
  viewer: {
    questions: {
      edges: Array<{ node: QuestionType }>
    }
  },
  relay: Object,
  router: Object
}
const QuestionBrowser = (props: QuestionBrowserPropsType) =>
  <Page
    className={styles.root}
    heading='Polls'
  >
    <DataTable
      columns={questionColumns}
    >
      {props.viewer.questions.edges.map(({ node }) =>
          <Question
            {...props}
            key={node.id}
            question={node}
          />
        )}
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