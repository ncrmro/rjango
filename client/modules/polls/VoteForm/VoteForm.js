import React from 'react'
import Button from 'react-mdc-web/lib/Button/Button'
import Page from 'components/Page/Page'

import QuestionChoices from './QuestionChoices'
import styles from '../Polls.scss'
import VoteMutation from './VoteMutation'
import withRelayContainer from 'utils/relay'

export const variables = { count: 10 }

type VoteMutationPropsType = {
  environment: Object,
  router: Object,
  question: Object,

}
class VoteMutationForm extends React.Component {
  constructor(props: VoteMutationPropsType) {
    super(props)
    if (props.viewer.question.hasViewerVoted) {
      // Will redirect user to previous url if they have already voted
      props.router.history.goBack()
    }
    this.state = {
      choice: {
        id: ''
      }
    }
  }

  _updateState(selected) {
    this.setState({ choice: { id: selected } })
  }

  _returnToPolls(form) {
    form.preventDefault()
    this.props.router.history.goBack()
  }

  _submitVoteMutation(form) {
    form.preventDefault()
    const { relay, viewer: { question }, router } = this.props
    const { choice } = this.state
    const input = { questionId: question.id, choiceId: choice.id }
    const callback = () => router.history.push(`/polls/${question.id}/results`)
    return VoteMutation(relay.environment, input, callback)
  }

  render() {
    const { viewer: { question }, router } = this.props
    const { choice } = this.state
    return (
      <Page
        heading={`Question: ${question.questionText}`}
        className={styles.pollDetailRoot}
      >
        <div>
          <h2> Choices </h2>
          <form className={styles.pollsVoteMutationRoot} >
            <QuestionChoices
              choiceSet={question.choiceSet}
              action={selected => this._updateState(selected)}
              selected={choice.id}
            />
            <div className={styles.pollsVoteMutationActions} >
              <Button
                onClick={form => this._returnToPolls(form)}
              >
                Cancel
              </Button>
              <Button
                onClick={form => this._submitVoteMutation(form)} >Submit</Button>
            </div>

          </form>
        </div>
      </Page>

    )
  }
}


const query = graphql`
    query VoteFormQuery($id: ID!) {
        viewer{
            question(id: $id) {
                id
                questionText
                hasViewerVoted
                choiceSet(first:10){
                    ...QuestionChoices_choiceSet
                }
            }
        }
    }
`
export default withRelayContainer(VoteMutationForm, query)