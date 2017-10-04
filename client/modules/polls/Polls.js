import React from 'react'
import Page from 'components/Page/Page'
import { createFragmentContainer, createRefetchContainer } from 'react-relay'
import Link from 'react-router-dom/es/Link'
import styles from './Polls.scss'
import withRelayContainer from 'utils/relay'

let Question = ({ question }) =>
  <div className={styles.question} >
    <Link to={`/polls/${question.id}/detail`} >{question.questionText}</Link>
  </div>

Question = createFragmentContainer(Question, {
  question: graphql`
      fragment Polls_question on Question {
          id
          questionText
      }
  `
})

const PollsList = props =>
  <Page
    className={styles.root}
    heading='Polls'
  >
    <p>This is the polls app</p>
    <ul>

      {props.viewer.questions.edges ? props.viewer.questions.edges.map(
        ({ node }) =>
          <li key={node.id} >
            <Question question={node} />
          </li>
      ) : 'loading..'}
    </ul>
  </Page>


const PollsListRefetchContainer = createRefetchContainer(PollsList, {
    viewer: graphql.experimental`
        fragment Polls_viewer on Viewer
        @argumentDefinitions(
            first: {type: "Int", defaultValue: 10},
        )
        {
            questions(first: $first){
                edges {
                    node {
                        id
                        ...Polls_question
                    }
                }
            }
        }
    `
  },
  graphql.experimental`
      query PollsListRefetchQuery($first: Int) {
          viewer{
              ...Polls_viewer @arguments(
                  first: $first,
              )
          }
      }
  `
)

const query = graphql`
    query PollsQuery{
        viewer{
            id
            questions{
                edges {
                    node {
                        id
                        ...Polls_question
                    }
                }
            }
        }
    }
`
export default withRelayContainer(PollsList, query)