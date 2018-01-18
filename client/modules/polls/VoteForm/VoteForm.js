import React from 'react'
import Button from 'react-mdc-web/lib/Button/Button'
import { createFragmentContainer, graphql } from 'react-relay'
import QuestionChoices from './QuestionChoices'
import styles from '../Polls.scss'
import VoteMutation from './VoteMutation'

export const variables = { count: 10 }

type VoteMutationPropsType = {
  environment: Object,
  router: Object,
  question: Object,
}
export class VoteMutationForm extends React.Component {
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
    const { relay, question, router: { history } } = this.props
    const { choice } = this.state
    const input = { questionId: question.id, choiceId: choice.id }

    const callback = () => history.push(`/polls/${question.id}/results`)
    return VoteMutation(relay.environment, input, callback)
  }

  render() {
    return <div>
      <h2> {this.props.question.questionText}</h2>
      <h3>Choices </h3>
      <form className={styles.pollsVoteMutationRoot} >
        <QuestionChoices
          choiceSet={this.props.question.choiceSet}
          action={selected => this._updateState(selected)}
          selected={this.state.choice.id}
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
  }
}


export const VoteFormFragmentContainer = createFragmentContainer(VoteMutationForm, {
    question: graphql`
        fragment VoteForm_question on Question {
            id
            questionText
            hasViewerVoted
            choiceSet(first:10){
                ...QuestionChoices_choiceSet
            }
        }
    `
  }
)