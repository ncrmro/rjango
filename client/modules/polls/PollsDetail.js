import React from 'react'
import { createRefetchContainer, graphql } from 'react-relay'
import Page from 'components/Page/Page'
import styles from './Polls.scss'
import PollsVote from './PollsVote'
import PollsResults from './PollsResults'
import withRelayContainer from './PollsContainer';

class PollDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      id: props.router.match.params.id,
      isLoading: true
    }
  }

  _updateState(selected) {
    this.setState({ selected })
  }

  render() {
    const { environment, viewer: { question }, router } = this.props
    const { isLoading } = this.state

    return (
      <Page heading='Polls Detail' className={styles.pollDetailRoot} >
        { isLoading ? 'loading' : null }

        { question ?
          <div>
            <h2>Question: {question.questionText}</h2>

          </div> : 'None Found'
        }
      </Page>
    )
  }
}




const query = graphql`
    query PollsDetailQuery($id: ID!) {
        viewer{
            question(id: $id) {
                questionText
                hasViewerVoted
       
            }
        }
    }
`
export default withRelayContainer(PollDetail, query)
