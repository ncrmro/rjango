import React from 'react'
import QuestionResults from './QuestionResults'
import Page from 'components/Page/Page'
import styles from '../Polls.scss'

const QuestionResultsPage = (props) =>
  <Page heading='Question' className={styles.pollDetailRoot} >
    <QuestionResults {...props}/>
  </Page>

export default QuestionResultsPage