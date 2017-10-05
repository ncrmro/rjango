import React from 'react'
import { graphql } from 'react-relay'
import Page from 'components/Page/Page'
import styles from '../Polls.scss'
import PollVoteForm from '../VoteForm/VoteForm'
import QuestionResults from './QuestionResults'
import withRelayContainer from 'utils/relay';

class QuestionPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      id: props.router.match.params.id,
    }
  }

  render() {
    const { relay, viewer: { question }, router } = this.props
    return (
      <Page heading='Question' className={styles.pollDetailRoot} >
        { question ?
          <div>
            <h2>{question.questionText}</h2>
            {console.log(question)}
            {question.hasViewerVoted ?
              <QuestionResults
                environment={relay.environment}
                question={question}
                router={router}
              /> :
              <PollVoteForm
                environment={relay.environment}
                question={question}
                router={router}
              />
            }

          </div> : 'None Found'
        }
      </Page>
    )
  }
}



/*
This will load both the votes and details
It could be split
*/

const query = graphql`
    query QuestionPageQuery($id: ID!) {
        viewer{
            question(id: $id) {
                questionText
                hasViewerVoted
                ...QuestionResults_question
                ...VoteForm_question
            }
        }
    }
`
export default withRelayContainer(QuestionPage, query)
