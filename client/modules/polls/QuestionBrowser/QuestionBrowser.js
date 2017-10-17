import React from 'react'
import Page from 'components/Page/Page'
import { DataTable } from 'components/DataTable/DataTable'
import type { QuestionType } from './Question'
import Question, { questionColumns } from './Question'
import withRelayContainer from 'utils/relay'
import Textfield from 'react-mdc-web/lib/Textfield/Textfield'

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
let QuestionBrowser = (props: QuestionBrowserPropsType) =>
  <div
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
  </div>

const query = graphql`
    query QuestionBrowserQuery($searchString: String){
        viewer{
            questions(searchString: $searchString){
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

QuestionBrowser = withRelayContainer(QuestionBrowser, query)

export default class QuestionBrowserPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchString: ''
    }
  }

  setSearchString({ target: { value } }) {
    this.setState({ searchString: value })
  }

  render() {
    return (
      <Page
        className={styles.root}
        heading='Polls'
      >
        <Textfield
          onChange={field => this.setSearchString(field)}
          floatingLabel="Search for a question"
          value={this.state.searchString}
        />
        <QuestionBrowser
          {...this.props}
          relay={{
              ...this.props.relay,
              variables: {
                searchString: this.state.searchString
              }
            }}
        />

      </Page>
    )
  }

}