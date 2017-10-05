import React from 'react'
import Button from 'react-mdc-web/lib/Button/Button'
import { createFragmentContainer } from 'react-relay'

import QuestionChoices from './QuestionChoices'
import styles from '../Polls.scss'
import VoteMutation from './VoteMutation'

export const variables = { count: 10 }

type VoteMutationPropsType = {
  environment: Object,
  router: Object,
  question: Object,

}
class VoteMutationForm extends React.Component {
  constructor(props: VoteMutationPropsType) {
    super(props)
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
    const { environment, question } = this.props
    const { choice } = this.state
    return VoteMutation(environment, question, choice, variables)
  }

  render() {
    const { question, router } = this.props
    const { choice } = this.state
    return (
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
          <Button onClick={form => this._submitVoteMutation(form)} >Submit</Button>
        </div>
      </form>
    )
  }
}

// Should do some form of auth here
//PollsVoteMutation = authenticatedRoute(true, PollsVoteMutation);

export default createFragmentContainer(VoteMutationForm, {
  question: graphql`
      fragment VoteForm_question on Question {
          choiceSet(first:10){
              ...QuestionChoices_choiceSet
          }
      }
  `
})

