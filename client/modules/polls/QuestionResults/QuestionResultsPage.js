import React from 'react'
import QuestionResults from './QuestionResults'
import Page from 'components/Page/Page'
import withRelayContainer from 'utils/relay'
import styles from '../Polls.scss'

const QuestionResultsPage = (props) =>
  <Page heading='Question' className={styles.pollDetailRoot} >
    <QuestionResults {...props} question={props.viewer.question}/>
  </Page>


const query = graphql`
    query QuestionResultsPageQuery($id: ID!) {
        viewer{
            question(id: $id) {
                ...QuestionResults_question
            }
        }
    }`

export default withRelayContainer(QuestionResultsPage, query)