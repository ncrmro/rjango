import React from 'react'
import { createRefetchContainer, graphql } from 'react-relay'
import Page from 'components/Page/Page'
import styles from './Polls.scss'
import PollsVote from './PollsVote'
import PollsResults from './PollsResults'
import withRelayContainer from 'utils/relay';

class PollDetail extends React.Component {
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
            {question.hasViewerVoted ?
              <PollsResults
                environment={relay.environment}
                question={question}
                router={router}
              /> :
              <PollsVote
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
    query PollsDetailQuery($id: ID!) {
        viewer{
            question(id: $id) {
                questionText
                hasViewerVoted
                ...PollsVote_question
            }
        }
    }
`
export default withRelayContainer(PollDetail, query)
