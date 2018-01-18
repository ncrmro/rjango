import React from 'react'
import Page from 'components/Page/Page'
import DataTableWithToolbar from 'components/DataTable/DataTableWithToolbar'
import Question, { questionColumns } from '../../../components/Question'
import withRelayContainer from 'utils/Relay'
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
  <div >
    <DataTableWithToolbar
      columns={questionColumns}
      addFunction={() => props.router.history.push('/polls/new')}
    >
      {props.viewer.questions.edges.map(({ node }) =>
        <Question
          {...props}
          key={node.id}
          question={node}
        />
      )}
    </DataTableWithToolbar>
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
          className={styles.searchBar}
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